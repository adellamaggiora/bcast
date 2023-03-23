import { Component } from '@angular/core';
import packageJson from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appVersion: string = packageJson.version;
  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'settings' },
    { title: 'Broadcasts', url: '/bcast/candidate', icon: 'earth' }
  ];

  logout() {
    
  }
}
