import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import client from 'src/api/client';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private userService: UserService) { }

  public login(email: string, password: string): Promise<string> {
    return client.auth.signIn({ email, password })
      .then(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data.user.id;
      })
      .then(userId => {
        this.userService.userId.set(userId);
        this.router.navigate(['bcast', 'candidate']);
        return userId;
      })
  }

}
