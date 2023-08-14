import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginFormValidator } from './login-form-validator';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  isRegistering: boolean = false;
  formValidator: LoginFormValidator;
  
  @Output() login = new EventEmitter<{ email: string, password: string }>();
  @Output() register = new EventEmitter<{ email: string, password: string }>();
  @Output() oauthLogin = new EventEmitter<'google' | 'facebook'>(null);

  constructor() { }

  ngOnInit() {
    this.formValidator = new LoginFormValidator();    
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

  doLogin() {
    const credentials = this.formValidator.getCredentials();
    this.login.emit(credentials);
  }

  doRegister() {
    const credentials = this.formValidator.getCredentials();
    this.register.emit(credentials);
  }

  doGoogleLogin() {
    this.oauthLogin.emit('google');
  }

}
