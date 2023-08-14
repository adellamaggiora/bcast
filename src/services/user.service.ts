import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable, share } from "rxjs";
import client from "src/api/client";
import { IUserInfo } from "src/interfaces/user-info";
import { utilsFns } from "src/functions/utils-fns";

@Injectable({
  providedIn: "root",
})
export class UserService {

  private _userInfo$ = new BehaviorSubject<IUserInfo>(null);

  private async _init() {
    const currentSession = await client.auth.getSession();
    if (currentSession) {
      await client.auth.refreshSession();;
      await this.userInfo.fetch();
    }
  }

  constructor() {
    this._init();
  }

  public userInfo = {
    get$: (): Observable<IUserInfo> =>
      this._userInfo$.asObservable()
        .pipe(
          share(),
          filter(utilsFns.existy),
        ),
    get: () => this._userInfo$.getValue(),
    fetch: async () => {
      const userId = await client.auth.getSession().then((session) => session.user.id);
      const userInfo = await client.userInfo.get(userId);
      this._userInfo$.next(userInfo);
    },
  };

  public userSession = {
    get: client.auth.getSession,
    getUserId: () => client.auth.getSession().then((_) => _?.user?.id),
  };
  
}
