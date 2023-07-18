import { Injectable } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { BehaviorSubject, Observable, filter, share } from 'rxjs';
import client from 'src/api/client';
import { IUserInfo } from 'src/interfaces/user-info';
import { Preferences } from "@capacitor/preferences";
import { StorageKeys } from 'src/constants/storage-keys';
import { utilsFns } from 'src/functions/utils-fns';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userInfo$: BehaviorSubject<IUserInfo> = new BehaviorSubject(null);

  private async _getUserSession() {
    const data = await Preferences.get({ key: StorageKeys.USER_SESSION });
    const userSession: Session = JSON.parse(data.value);
    return userSession;
  }

  constructor() {
    (async () => {
      const userSession = await this._getUserSession();
      if (userSession?.user?.id) {
        this.userInfo.fetch(userSession.user.id);
      }
    })()
  }

  public userInfo = {
    get$: (): Observable<IUserInfo> => this._userInfo$.asObservable()
      .pipe(
        share(),
        filter(utilsFns.existy)
      ),
    get: () => this._userInfo$.getValue(),
    fetch: async (userId: string) => {
      const userInfo = await client.userInfo.get(userId);
      this._userInfo$.next(userInfo);
    }
  }

  public userSession = {
    get: this._getUserSession,
    set: (userSession: Session) => {
      Preferences.set({ key: StorageKeys.USER_SESSION, value: JSON.stringify(userSession) });
    },
    getId: () => this._getUserSession().then(_ => _?.user?.id)
  }

}
