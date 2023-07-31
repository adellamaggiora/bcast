import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import packageJson from '../../package.json';
import { Session } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { BcastService } from 'src/services/bcast.service';
import { IGeoLocation } from 'src/interfaces/geo-location';

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

  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  get isBcastListPage(): boolean {
    return this.router.url === '/bcast/list';
  }

  constructor(public bcastService: BcastService, private router: Router, private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  onSelectedLocation(location: IGeoLocation) {
    this.bcastService.selectedLocation.set(location);
  }

}
