import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';
import client from 'src/api/client';
import { LSKeys } from 'src/constants/local-storage-keys';
import { IUserInfo } from 'src/interfaces/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userId$: BehaviorSubject<string> = new BehaviorSubject(null);
  private _userInfo$: BehaviorSubject<IUserInfo> = new BehaviorSubject(null);

  constructor() {
    const storedUserId = localStorage.getItem(LSKeys.USER_ID);
    if (storedUserId) {
      this.userId.set(storedUserId);
    }
    this.userInfo.fetch();
  }

  public userId = {
    set: (userId: string) => {
      localStorage.setItem('bcast_user_id', userId);
      this._userId$.next(userId);
    },
    get$: () => this._userId$.asObservable().pipe(share()),
    get: () => this._userId$.getValue()
  }

  public userInfo = {
    get$: () => this._userInfo$.asObservable().pipe(share()),
    get: () => this._userInfo$.getValue(),
    fetch: async () => {
      const userId = this.userId.get();
      const userInfo = await client.userInfo.get(userId);
      this._userInfo$.next(userInfo); 
    }
  }

}
