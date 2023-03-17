import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, share } from 'rxjs';
import client from 'src/api/client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userUd$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private router: Router) { 
    const storedUserId = localStorage.getItem('bcast_user_id');
    if (storedUserId) {
      this.setUserId(storedUserId);
    }
  }

  private setUserId(userId: string) {
    localStorage.setItem('bcast_user_id', userId);
    this._userUd$.next(userId);
  }

  //#region public

  public login(email: string, password: string): Promise<string> {
    return client.auth.signIn({ email, password })
      .then(({data, error}) => {
        if (error) {
          throw error;
        }
        return data.user.id;
      })
      .then(userId => {
        this.setUserId(userId);
        this.router.navigate(['bcast', 'candidate']);
        return userId;
      })
  }

  public userId$() {
    return this._userUd$.asObservable().pipe(share());
  }

  public userId() {
    return this._userUd$.getValue();
  }

  //#endregion

}
