import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import client from 'src/api/client';
import { UserAuth } from 'src/interfaces/user-auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private userService: UserService) { }

  public login(email: string, password: string) {
    return client.auth.signIn({email, password})
      .then((userAuth: UserAuth) => {
        this.userService.userSession.set(userAuth.session);
        this.router.navigate(['bcast', 'candidate']);
      })
  }

  public logout() {
    this.userService.userSession.set(null);
    this.router.navigate(['login']);
  }

}
