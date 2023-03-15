import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'settings' },
    { title: 'Broadcasts', url: '/bcast', icon: 'earth' }
  ];


}
