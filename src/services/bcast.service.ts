import { Injectable } from '@angular/core';
import { BehaviorSubject, map, share } from 'rxjs';
import client from 'src/api/client';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { UserService } from './user.service';
import { IListedBcast } from 'src/interfaces/listed-bcast';
import { IBcast } from 'src/interfaces/bcast';
import { Preferences } from '@capacitor/preferences';
import { StorageKeys } from 'src/constants/storage-keys';
import { IBcastFilters } from 'src/interfaces/filters/bcast-filters';
import { IBcastDetail } from 'src/interfaces/bcast-detail';


@Injectable({
  providedIn: 'root'
})
export class BcastService {

  private _bcastDetailCache: Map<string, IBcastDetail> = new Map();

  private _bcastList$ = new BehaviorSubject<IListedBcast[]>([]);
  private _bcastFilters$ = new BehaviorSubject<IBcastFilters>(null);

  constructor(private userService: UserService) { }

  private _clearBcastDetailCache() {
    this._bcastDetailCache = new Map();
  }

  public bcastList = {
    get$: () => this._bcastList$.asObservable().pipe(share()),
    get: () => this._bcastList$.getValue(),
    fetch: async (location: IGeoLocation, filters: IBcastFilters) => {
      console.log('::[fetching bcast list]');
      const userId = await this.userService.userSession?.getUserId();
      const bcastList: IListedBcast[] = await client.bcast.getList(userId, location, filters);
      this._bcastList$.next(bcastList);
    }
  }

  public bcast = {
    getDetail: async (bcastId: string, location: IGeoLocation) => {
      let bcastDetail: IBcastDetail;
      if (this._bcastDetailCache.has(bcastId)) {
        bcastDetail = this._bcastDetailCache.get(bcastId);
      }
      else {
        console.log('::[fetching bcast detail]');
        const userId = await this.userService.userSession?.getUserId();
        bcastDetail = await client.bcast.getDetail(userId, bcastId, location);
        this._bcastDetailCache.set(bcastId, bcastDetail);
      }
      return bcastDetail;
    },
    join: async (bcastId: string) => {
      const userId = await this.userService.userSession?.getUserId();
      return await client.bcast.join(userId, bcastId);
    },
    insert: async (bcast: Partial<IBcast>) => {
      const userId = await this.userService.userSession?.getUserId();
      return await client.bcast.insert(userId, bcast);
    }
  }

  public filters = {
    fetch: async () => {
      const stringifyFilters = await Preferences.get({ key: StorageKeys.BCAST_FILTERS });
      const filters: IBcastFilters = JSON.parse(stringifyFilters?.value);
      this._bcastFilters$.next(filters);
    },
    get$: () => this._bcastFilters$.asObservable().pipe(share()),
    get: () => this._bcastFilters$.getValue(),
    set: async (filters: IBcastFilters) => {
      this._bcastFilters$.next(filters);
      const stringifyFilters = JSON.stringify(filters);
      return await Preferences.set({ key: StorageKeys.BCAST_FILTERS, value: stringifyFilters });
    },
    getFavoriteTag$: () => this.filters.get$()
      .pipe(
        map(_ => {
          let result = []
          if (!_?.tag?.any) {
             result = _?.tag?.favorite;
          }
          return result;
        })        
      )
  }

}