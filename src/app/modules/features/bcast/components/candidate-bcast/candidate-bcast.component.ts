import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { toast } from 'src/api/utils/toast';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { BcastService } from 'src/services/bcast.service';


@Component({
  selector: 'app-candidate-bcast',
  templateUrl: './candidate-bcast.component.html',
  styleUrls: ['./candidate-bcast.component.scss'],
})
export class CandidateBcastComponent implements OnInit {

  constructor(public bcastService: BcastService, private geolocation: Geolocation) { }

  ngOnInit() {
    console.log('magheeooooooo')
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
    // const location = await this.getGeoLocation();
    //await this.bcastService.candidate.fetch(location);

    this.geolocation.getCurrentPosition()
    .then(({ coords, timestamp }) => {
      console.log('current location:');
      console.log(coords);
    })
    .catch(console.error)
  }


  getGeoLocation(): Promise<IGeoLocation> {
    this.geolocation.getCurrentPosition()
      .then(({ coords, timestamp }) => {
        console.log('current location:');
        console.log(coords);
      })
      .catch(console.error)
    return null
  }


}
