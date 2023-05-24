import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, from, merge, share } from 'rxjs';
import client from 'src/api/client';
import { IBcast } from 'src/interfaces/bcast';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { UserService } from './user.service';
import { utilsFns } from 'src/functions/utils-fns';

@Injectable({
  providedIn: 'root'
})
export class BcastService {

  private _candidate$: BehaviorSubject<IBcast[]> = new BehaviorSubject(null);
  private _joined$: BehaviorSubject<IBcast[]> = new BehaviorSubject(null);
  private _inserted$: BehaviorSubject<IBcast[]> = new BehaviorSubject(null);

  constructor(private userService: UserService) { }

  public candidate  = {
    get$: () => this._candidate$.asObservable().pipe(share()),
    get: () => this._candidate$.getValue(),
    fetch: async (location: IGeoLocation, maxDistanceKm: number) => {
      const userId = this.userService.userSession?.get()?.user?.id;
      const tag = this.userService.userInfo.get()?.tag;
      const candidateBcast = await client.bcast.getCandidate(userId, location, maxDistanceKm, tag);
      this._candidate$.next(candidateBcast?.bcast);
    },
    join: async (bcastId: string) => {
      const userId = this.userService.userSession?.get()?.user?.id;
      await client.bcast.join(userId, bcastId);
    },
    hide: async (bcastId: string) => {
      const userId = this.userService.userSession?.get()?.user?.id;
      await client.bcast.hide(userId, bcastId);
    }
  } 

  public joined  = {
    get$: () => this._joined$.asObservable().pipe(share()),
    get: () => this._joined$.getValue(),
    fetch: async () => {
      const userId = this.userService.userSession?.get()?.user?.id;
      const joinedBcast = await client.bcast.getJoined(userId);
      this._joined$.next(joinedBcast?.bcast);
    }
  } 

  public inserted = {
    get$: () => this._inserted$.asObservable().pipe(share()),
    get: () => this._inserted$.getValue(),
    fetch: async () => {
      const userId = this.userService.userSession?.get()?.user?.id;
      const insertedBcast = await client.bcast.getInserted(userId);
      this._inserted$.next(insertedBcast?.bcast);
    }
  }

  public chatList = {
    get$: () => from(merge(this.joined.get$(), this.inserted.get$()))
      .pipe(
        filter(utilsFns.existy),
        filter(_ => _.length > 0),
        share()
    ),
    get: () => [...this._joined$.getValue(), ...this._inserted$.getValue()],
    fetch: async () => {
      await this.inserted.fetch();
      await this.joined.fetch();
    }
  }


}
