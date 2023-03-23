import { Component } from '@angular/core';
import { ICandidateBcast } from 'src/interfaces/candidate-bcast';
import { AuthService } from 'src/services/auth.service';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IGeoLocation } from 'src/interfaces/geo-location';
import client from 'src/api/client';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {

  candidateBcast: ICandidateBcast[];

  constructor(private authService: AuthService) { 
    this.getCandidateBcast();

  }

  onJoin(evt: boolean) {
    console.log('join')
  }

  onDiscard(evt: boolean) {
    console.log('discard')
  }

  async getCandidateBcast() {
    const userId = this.authService.userId();
    const location = await this.getGeoLocation();
    const { tag } = await client.userInfo.get(userId);

    this.candidateBcast = await client.bcast.getCandidate(userId)(location)(tag);
  }
  

  getGeoLocation(): Promise<IGeoLocation> {
    return new Promise(res => {
      res({ lat: 43.15263, lng:11.25636 })
    })
    // return this.geolocation.getCurrentPosition().then(_ => {
    //   return {
    //     lat: _.coords.latitude,
    //     lng: _.coords.longitude
    //   }
    // })
  }
  

}
