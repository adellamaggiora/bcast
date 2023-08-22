import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { toast } from "src/functions/notifiers/toast";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isRegistering: boolean = false;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
    });
  }

  async onLogin(evt) {
    try {
      const { email, password } = evt;
      await this.authService.login(email, password);
    } catch (error) {
      toast.fail(error);
    }
  }

  async onRegister(evt) {
    try {
      const { email, password } = evt;
      await this.authService.register(email, password);
    } catch (error) {
      toast.fail(error);
    }
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

  async onOauthLogin(evt: "google" | "facebook") {
    if (evt === "google") {
      await this.authService.googleLogin();
    }
  }
}
