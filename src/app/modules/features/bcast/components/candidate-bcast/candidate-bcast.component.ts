import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { IGeoLocation } from 'src/interfaces/geo-location';
import client from 'src/api/client';
import { ToastService } from 'src/services/toast.service';
import { BcastService } from 'src/services/bcast.service';


@Component({
  selector: 'app-candidate-bcast',
  templateUrl: './candidate-bcast.component.html',
  styleUrls: ['./candidate-bcast.component.scss'],
})
export class CandidateBcastComponent {

  constructor(public bcastService: BcastService, private toastService: ToastService) { 
    this.getCandidateBcast();
  }

  onJoin(bcastId: string) {
    this.bcastService.candidate.join(bcastId)
      .then(() => this.toastService.success(`Broadcast joined`))
      .catch(err => this.toastService.danger(err))
  }

  onHide(bcastId: string) {
    this.bcastService.candidate.join(bcastId)
      .then(() => this.toastService.success(`Broadcast hided`))
      .catch(err => this.toastService.danger(err))
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
