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

  private _userInfo$ = new BehaviorSubject<IUserInfo>(null);

  private async _getUserSessionStorage() {
    const data = await Preferences.get({ key: StorageKeys.USER_SESSION });
    const userSession: Session = JSON.parse(data?.value);
    return userSession;
  }

  private async _getRefreshedSession() {
    const userAuth = await client.auth.refresh();
    return userAuth.session;
  }

  private async _init() {
    const storedSession = await this._getUserSessionStorage();
    if (storedSession) {
      const refreshedSession = await this._getRefreshedSession();
      this.userSession.set(refreshedSession);
      await this.userInfo.fetch();
    }
  }

  constructor() {
    this._init();
  }

  public userInfo = {
    get$: (): Observable<IUserInfo> => this._userInfo$.asObservable()
      .pipe(
        share(),
        filter(utilsFns.existy)
      ),
    get: () => this._userInfo$.getValue(),
    fetch: async () => {
      const userId = await this._getUserSessionStorage().then(session => session.user.id);
      const userInfo = await client.userInfo.get(userId);
      this._userInfo$.next(userInfo);
    }
  }

  public userSession = {
    get: this._getUserSessionStorage,
    set: (userSession: Session) => {
      Preferences.set({ key: StorageKeys.USER_SESSION, value: JSON.stringify(userSession) });
    },
    getUserId: () => this._getUserSessionStorage().then(_ => _?.user?.id)
  }

}
