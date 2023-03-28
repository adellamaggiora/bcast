import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';
import client from 'src/api/client';
import { LSKeys } from 'src/constants/local-storage-keys';
import { IUserInfo } from 'src/interfaces/user-info';
import { IUserSession } from 'src/interfaces/user-session';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userInfo$: BehaviorSubject<IUserInfo> = new BehaviorSubject(null);
  private _userSession$: BehaviorSubject<IUserSession> = new BehaviorSubject(null);

  constructor() {
    const storedUserId = localStorage.getItem(LSKeys.USER_ID);
    console.log(`stored user id: ${storedUserId}`);
  }


  public userInfo = {
    get$: () => this._userInfo$.asObservable().pipe(share()),
    get: () => this._userInfo$.getValue(),
    fetch: async () => {
      const userId = this._userSession$.getValue()?.id;
      const userInfo = await client.userInfo.get(userId);
      this._userInfo$.next(userInfo); 
    }
  }

  public userSession = {
    get$: () => this._userSession$.asObservable().pipe(share()),
    get: () => this._userSession$.getValue(),
    set: (userSession: IUserSession) => {
      localStorage.setItem(LSKeys.USER_ID, userSession?.id);
      this._userSession$.next(userSession);
    } 
  }

}
