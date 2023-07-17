import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import packageJson from '../../package.json';
import { UserService } from 'src/services/user.service';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  userSession: Session;
  appVersion: string = packageJson.version;
  appPages = [
    { title: 'Profile', url: '/profile', icon: 'person' }
  ];

  constructor(public userService: UserService, private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
