import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';
import client from 'src/api/client';
import { IBcast } from 'src/interfaces/bcast';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { UserService } from './user.service';

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
    fetch: async (location: IGeoLocation) => {
      const userId = this.userService.userId.get();
      const userInfo = this.userService.userInfo.get();
      if (!userInfo) {
        await this.userService.userInfo.fetch();
      }
      const tag = this.userService.userInfo.get()?.tag;
      const candidateBcast = await client.bcast.getCandidate(userId)(location)(tag);
      this._candidate$.next(candidateBcast);
    }
  }

  public joined  = {
    get$: () => this._joined$.asObservable().pipe(share()),
    get: () => this._joined$.getValue(),
    fetch: async () => {
      const userId = this.userService.userId.get();
      const joinedBcast = await client.bcast.getJoined(userId);
      this._joined$.next(joinedBcast);
    }
  } 

  public inserted  = {
    get$: () => this._inserted$.asObservable().pipe(share()),
    get: () => this._inserted$.getValue(),
    fetch: async () => {
      const userId = this.userService.userId.get();
      const insertedBcast = await client.bcast.getInserted(userId);
      this._inserted$.next(insertedBcast);
    }
  }


}
