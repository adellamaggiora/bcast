import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { toast } from 'src/api/utils/toast';
import { BcastService } from 'src/services/bcast.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-candidate-bcast',
  templateUrl: './candidate-bcast.component.html',
  styleUrls: ['./candidate-bcast.component.scss'],
})
export class CandidateBcastComponent implements OnInit {

  constructor(public bcastService: BcastService, public userService: UserService, private geolocation: Geolocation) { }

  ngOnInit() {
    this.fetchCandidiateBcast();
  }

  onJoin(bcastId: string) {
    this.bcastService.candidate.join(bcastId)
      .then(() => toast.success(`Broadcast joined`))
  }

  onHide(bcastId: string) {
    this.bcastService.candidate.join(bcastId)
      .then(() => toast.success(`Broadcast hided`))
  }

  async fetchCandidiateBcast() {
    const geoposition = await this.updateUserPosition();
    const maxDistanceKm = 50;
    const { coords: { latitude: lat, longitude: lng } } = geoposition;
    await this.bcastService.candidate.fetch({ lat, lng }, maxDistanceKm);
  }

  async updateUserPosition() {
    const geoposition = await this.geolocation.getCurrentPosition();
    this.userService.userGeoposition.update(geoposition);
    return geoposition;
  }


}
