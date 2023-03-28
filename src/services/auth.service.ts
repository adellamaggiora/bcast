import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import client from 'src/api/client';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  public login(email: string, password: string) {
    const request = from(client.auth.signIn({ email, password })) 

    /*
      .then(({ data, error }) => {
        if (error) {
          throw this.toastService.danger(error.message);
        }
        return data.user.id;
      })
      .then(userId => {
        this.userService.userId.set(userId);
        this.router.navigate(['bcast', 'candidate']);
        return userId;
      })
      */
    return request;
  }

}
