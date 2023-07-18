import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import packageJson from '../../package.json';
import { Session } from '@supabase/supabase-js';
import { Router } from '@angular/router';

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

  constructor(public router: Router, private authService: AuthService) { }


  logout() {
    this.authService.logout();
  }
}
