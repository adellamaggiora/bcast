import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import packageJson from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(private authService: AuthService) { }

  public appVersion: string = packageJson.version;
  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'Broadcasts', url: '/bcast/candidate', icon: 'earth' }
  ];

  logout() {
    this.authService.logout();
  }
}
