import { Injectable } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Session } from '@supabase/supabase-js';
import { BehaviorSubject, Observable, filter, map, share } from 'rxjs';
import client from 'src/api/client';
import { LSKeys } from 'src/constants/local-storage-keys';
import { IUserInfo } from 'src/interfaces/user-info';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { utilsFns } from 'src/functions/utils-fns';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userInfo$: BehaviorSubject<IUserInfo> = new BehaviorSubject(null);
  private _userSession$: BehaviorSubject<Session> = new BehaviorSubject(null);
  private _userGeoposition$: BehaviorSubject<Geoposition> = new BehaviorSubject(null);

  constructor() {
    const storedUserId = localStorage.getItem(LSKeys.USER_ID);
    if (storedUserId) {
      this.userInfo.fetch(storedUserId);
    }
  }


  public userInfo = {
    get$: () => this._userInfo$.asObservable().pipe(share()),
    get: () => this._userInfo$.getValue(),
    fetch: async (userId: string) => {
      const userInfo = await client.userInfo.get(userId);
      this._userInfo$.next(userInfo);
    }
  }

  public userSession = {
    get$: () => this._userSession$.asObservable().pipe(share()),
    get: () => this._userSession$.getValue(),
    set: (userSession: Session) => {
      this._userSession$.next(userSession);
      if (userSession?.user?.id) {
        localStorage.setItem(LSKeys.USER_ID, userSession.user.id);
        this.userInfo.fetch(userSession.user.id)
      }
    }
  }

  public userGeoposition = {
    get$: () => this._userGeoposition$.asObservable().pipe(share()),
    get: () => this._userGeoposition$.getValue(),
    update: (geoposition: Geoposition) => this._userGeoposition$.next(geoposition),
    getLocation$: (): Observable<IGeoLocation> => this.userGeoposition.get$()
      .pipe(
        filter(utilsFns.existy),
        map((geoposition: Geoposition) => {
          const { coords: {latitude: lat, longitude: lng}, timestamp } = geoposition;
          return { lat, lng, lastUpdate: timestamp };
        })
      )
  }

}
