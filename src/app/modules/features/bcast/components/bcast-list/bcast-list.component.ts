import { Component, OnInit } from '@angular/core';
import { BcastService } from 'src/services/bcast.service';
import { UserService } from 'src/services/user.service';
import { Geolocation } from '@capacitor/geolocation';
import { IGeoLocation } from 'src/interfaces/geo-location';


@Component({
  selector: 'app-bcast-list',
  templateUrl: './bcast-list.component.html',
  styleUrls: ['./bcast-list.component.scss'],
})
export class BcastListComponent implements OnInit {

  constructor(public bcastService: BcastService, public userService: UserService) { }

  async ionViewWillEnter() {
    console.log('0dfvdfa')
  }

  async ngOnInit() {
    this.bcastService.selectedLocation.get$().subscribe(selectedLocation => {
      this.fetchBcastList(selectedLocation);
    })
  }

  async fetchBcastList(selectedLocation: IGeoLocation) {
    const maxDistanceMeters = 5000000;
    if (selectedLocation) {
      await this.bcastService.bcastList.fetch(selectedLocation, maxDistanceMeters);
    } else {
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude: lat, longitude: lng } = coordinates?.coords;
      await this.bcastService.bcastList.fetch({ lat, lng }, maxDistanceMeters);
    }
  }

  async handleRefresh(evt: any) {
    const selectedLocation = this.bcastService.selectedLocation.get();
    await this.fetchBcastList(selectedLocation);
    evt.target.complete();
  }  
  
}