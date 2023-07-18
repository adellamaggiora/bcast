import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { toast } from 'src/api/utils/toast';
import { BcastService } from 'src/services/bcast.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-bcast-list',
  templateUrl: './bcast-list.component.html',
  styleUrls: ['./bcast-list.component.scss'],
})
export class BcastListComponent implements OnInit {

  constructor(public bcastService: BcastService, public userService: UserService, private geolocation: Geolocation) { }

  ngOnInit() {
    this.fetchBcastList();
  }

  onJoin(bcastId: string) {
    this.bcastService.bcast.join(bcastId)
      .then(() => toast.success(`Broadcast joined`))
  }

  async fetchBcastList() {
    const maxDistanceMeters = 5000000;
    const { coords: { latitude: lat, longitude: lng } } = await this.geolocation.getCurrentPosition();
    await this.bcastService.bcastList.fetch({ lat, lng }, maxDistanceMeters);
  }

}
