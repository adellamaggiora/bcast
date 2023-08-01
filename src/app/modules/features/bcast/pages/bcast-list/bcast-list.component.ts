import { Component, OnInit } from '@angular/core';
import { BcastService } from 'src/services/bcast.service';
import { UserService } from 'src/services/user.service';
import { Geolocation } from '@capacitor/geolocation';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { Router } from '@angular/router';
import { IListedBcast } from 'src/interfaces/listed-bcast';


@Component({
  selector: 'app-bcast-list',
  templateUrl: './bcast-list.component.html',
  styleUrls: ['./bcast-list.component.scss'],
})
export class BcastListComponent implements OnInit {

  constructor(public bcastService: BcastService, public userService: UserService, private router: Router) { }

  async ngOnInit() {
    this.bcastService.selectedLocation.get$().subscribe(selectedLocation => {
      this.fetchBcastList(selectedLocation);
    })
  }

  async fetchBcastList(selectedLocation: IGeoLocation) {
    const maxDistanceMeters = null;
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

  onBcastCardClick(listedBcast: IListedBcast) {
    const { id, joined, distMeters } = listedBcast;
    this.router.navigate(['bcast', 'detail', id], { queryParams: { joined, distMeters } });
  }
  
}