import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import client from 'src/api/client';
import { toast } from 'src/api/utils/toast';
import { IUserSession } from 'src/interfaces/user-session';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private userService: UserService) { }

  public login(email: string, password: string) {
    return client.auth.signIn(email, password)
      .then((userSession: IUserSession) => {
        this.userService.userSession.set(userSession);
        toast.success('Login successful');
        this.router.navigate(['bcast', 'candidate']);
      })
  }

  public logout() {
    this.userService.userSession.set(null);
    this.router.navigate(['login']);
  }

}
