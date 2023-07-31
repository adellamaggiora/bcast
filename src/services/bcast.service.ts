import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';
import client from 'src/api/client';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { UserService } from './user.service';
import { IListedBcast } from 'src/interfaces/listed-bcast';
import { IBcast } from 'src/interfaces/bcast';
import { Preferences } from '@capacitor/preferences';
import { StorageKeys } from 'src/constants/storage-keys';
import { BcastFilters } from 'src/interfaces/bcast-filters';

@Injectable({
  providedIn: 'root'
})
export class BcastService {

  private _bcastList$ = new BehaviorSubject<IListedBcast[]>([]);
  private _selectedLocation$ = new BehaviorSubject<IGeoLocation>(null);

  constructor(private userService: UserService) { }

  public bcastList = {
    get$: () => this._bcastList$.asObservable().pipe(share()),
    get: () => this._bcastList$.getValue(),
    fetch: async (location: IGeoLocation, maxDistanceMeters: number) => {
      const userId = await this.userService.userSession?.getId();
      const bcastList: IListedBcast[] = await client.bcast.getList(userId, location, maxDistanceMeters);
      this._bcastList$.next(bcastList);
    }
  }

  public bcast = {
    get: async (bcastId: string) => client.bcast.get(bcastId),
    join: async (bcastId: string) => {
      const userId = await this.userService.userSession?.getId();
      await client.bcast.join(userId, bcastId);
    },
    insert: async (bcast: Partial<IBcast>) => {
      const userId = await this.userService.userSession?.getId();
      client.bcast.insert(userId, bcast);
    }
  }

  public selectedLocation = {
    get$: () => this._selectedLocation$.asObservable().pipe(share()),
    get: () => this._selectedLocation$.getValue(),
    set: (location: IGeoLocation) => this._selectedLocation$.next(location)
  }

  public bcastFilters = {
    get: async () => {
      const data = await Preferences.get({ key: StorageKeys.BCAST_FILTERS });
      const bcastFilters: BcastFilters = JSON.parse(data?.value);
      return bcastFilters;
    },
    set: async (bcastFilters: BcastFilters) => {
      const data = JSON.stringify(bcastFilters);
      return await Preferences.set({ key: StorageKeys.BCAST_FILTERS, value: data });
    }
  }

}