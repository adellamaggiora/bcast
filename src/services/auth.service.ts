import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import client from "src/api/client";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router, private userService: UserService) {}

  public login(email: string, password: string) {
    return client.auth.signIn({ email, password })
      .then(() => {
        this.router.navigate(["bcast", "list"]);
      });
  }

  public register(email: string, password: string) {
    return client.auth.signUp({ email, password })
      .then(() => {
        this.router.navigate(["bcast", "list"]);
      });
  }

  public logout() {
    return client.auth.signOut()
      .then(() => {
        this.router.navigate(["login"]);
      });
  }

  public googleLogin() {
    return client.auth.signInWithGoogle();
  }
}
