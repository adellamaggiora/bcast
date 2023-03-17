import { Component } from '@angular/core';
import { ICandidateBcast } from 'src/interfaces/candidate-bcast';
import { AuthService } from 'src/services/auth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IGeoLocation } from 'src/interfaces/geo-location';
import client from 'src/api/client';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {

  candidateBcast: ICandidateBcast[];

  constructor(private authService: AuthService, private geolocation: Geolocation) { 
    this.getCandidateBcast();

  }

  onJoin(evt: boolean) {
    client.bcast.join(this.authService.userId()).then(_ => {
      console.log(_)
    })
  }

  onDiscard(evt: boolean) {

  }

  async getCandidateBcast() {
    const userId = this.authService.userId();
    const location = await this.getGeoLocation();
    const { tag } = await client.userInfo.get(userId);

    this.candidateBcast = await client.bcast.getCandidate(userId)(location)(tag);
  }
  

  getGeoLocation(): Promise<IGeoLocation> {
    return this.geolocation.getCurrentPosition().then(_ => {
      return {
        lat: _.coords.latitude,
        lng: _.coords.longitude
      }
    })
  }
  

}
