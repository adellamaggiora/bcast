import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isRegistering: boolean = false;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }

  doLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  doRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }


  matchingPasswords(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matchingPasswords: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

}
