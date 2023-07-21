import { Component, OnInit } from '@angular/core';
import { BcastService } from 'src/services/bcast.service';
import { UserService } from 'src/services/user.service';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-bcast-list',
  templateUrl: './bcast-list.component.html',
  styleUrls: ['./bcast-list.component.scss'],
})
export class BcastListComponent implements OnInit {

  constructor(public bcastService: BcastService, public userService: UserService) { }

  ngOnInit() {
    this.fetchBcastList();
  }

  onJoin(bcastId: string) {
    this.bcastService.bcast.join(bcastId)
  }

  async fetchBcastList() {
    const maxDistanceMeters = 5000000;
    const coordinates = await Geolocation.getCurrentPosition();
    const { latitude: lat, longitude: lng } = coordinates?.coords;
    await this.bcastService.bcastList.fetch({ lat, lng }, maxDistanceMeters);
  }

  async handleRefresh(evt: any) {
    await this.fetchBcastList();
    evt.target.complete();
  }

}
