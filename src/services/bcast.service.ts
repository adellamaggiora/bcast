import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';
import client from 'src/api/client';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { UserService } from './user.service';
import { IListedBcast } from 'src/interfaces/listed-bcast';
import { IBcast } from 'src/interfaces/bcast';
import { Preferences } from '@capacitor/preferences';
import { StorageKeys } from 'src/constants/storage-keys';
import { IBcastFilters } from 'src/interfaces/filters/bcast-filters';


@Injectable({
  providedIn: 'root'
})
export class BcastService {

  private _bcastList$ = new BehaviorSubject<IListedBcast[]>([]);

  constructor(private userService: UserService) { }

  public bcastList = {
    get$: () => this._bcastList$.asObservable().pipe(share()),
    get: () => this._bcastList$.getValue(),
    fetch: async (location: IGeoLocation, maxDistanceMeters?: number) => {
      const userId = await this.userService.userSession?.getUserId();
      const bcastList: IListedBcast[] = await client.bcast.getList(userId, location, maxDistanceMeters);
      this._bcastList$.next(bcastList);
    }
  }

  public bcast = {
    getDetail: async (bcastId: string, location: IGeoLocation) => {
      const userId = await this.userService.userSession?.getUserId();
      return await client.bcast.getDetail(userId, bcastId, location);
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

  public bcastFilters = {
    get: async () => {
      const data = await Preferences.get({ key: StorageKeys.BCAST_FILTERS });
      const bcastFilters: IBcastFilters = JSON.parse(data?.value);
      return bcastFilters;
    },
    set: async (bcastFilters: IBcastFilters) => {
      const data = JSON.stringify(bcastFilters);
      return await Preferences.set({ key: StorageKeys.BCAST_FILTERS, value: data });
    }
  }

}