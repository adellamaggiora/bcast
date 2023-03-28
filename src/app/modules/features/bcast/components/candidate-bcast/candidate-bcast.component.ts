import { Component } from '@angular/core';
import { toast } from 'src/api/utils/toast';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { BcastService } from 'src/services/bcast.service';


@Component({
  selector: 'app-candidate-bcast',
  templateUrl: './candidate-bcast.component.html',
  styleUrls: ['./candidate-bcast.component.scss'],
})
export class CandidateBcastComponent {

  constructor(public bcastService: BcastService) { 
    this.getCandidateBcast();
  }

  onJoin(bcastId: string) {
    this.bcastService.candidate.join(bcastId)
      .then(() => toast.success(`Broadcast joined`))
  }

  onHide(bcastId: string) {
    this.bcastService.candidate.join(bcastId)
      .then(() => toast.success(`Broadcast hided`))
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
