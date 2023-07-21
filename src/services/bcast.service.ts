import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';
import client from 'src/api/client';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { UserService } from './user.service';
import { IListedBcast } from 'src/interfaces/listed-bcast';

@Injectable({
  providedIn: 'root'
})
export class BcastService {

  private _bcastList$: BehaviorSubject<IListedBcast[]> = new BehaviorSubject([]);

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
    }
  }



}
