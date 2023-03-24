import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { IGeoLocation } from 'src/interfaces/geo-location';
import client from 'src/api/client';
import { ToastService } from 'src/services/toast.service';
import { BcastService } from 'src/services/bcast.service';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {

  constructor(public bcastService: BcastService, private toastService: ToastService) { 
    this.getCandidateBcast();
  }

  onJoin(evt: boolean) {
    this.toastService.warning('joined')
  }

  onDiscard(evt: boolean) {
    console.log('discard')
  }

  async getCandidateBcast() {
    const location = await this.getGeoLocation();
    await this.bcastService.candidate.fetch(location);
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
