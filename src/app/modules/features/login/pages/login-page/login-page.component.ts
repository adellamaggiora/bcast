import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isRegistering: boolean = false;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  async onLogin(evt) {
    const { email, password } = evt;
    await this.authService.login(email, password);
  }

  async onRegister(evt) {
    const { email, password } = evt;
    await this.authService.register(email, password);
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

}
