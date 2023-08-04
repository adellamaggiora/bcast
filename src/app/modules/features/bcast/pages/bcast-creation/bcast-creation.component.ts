import { Component, OnInit } from '@angular/core';
import { toast } from 'src/functions/notifiers/toast';
import { utilsFns } from 'src/functions/utils-fns';
import { IBcast } from 'src/interfaces/bcast';
import { BcastService } from 'src/services/bcast.service';
import { LoaderService } from 'src/services/loader.service';
import { Geolocation } from '@capacitor/geolocation';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bcast-creation',
  templateUrl: './bcast-creation.component.html',
  styleUrls: ['./bcast-creation.component.scss'],
})
export class BcastCreationComponent {

  initForm: boolean;

  constructor(
    private bcastService: BcastService, 
    private dataService: DataService, 
    private loaderService: LoaderService,
    private router: Router
    ) { }

  ionViewDidEnter() {
    this.initForm = false;
  }

  async onSaveBcast(bcast: Partial<IBcast>) {
    this.loaderService.show(`Saving broadcast...`);
    try {
      if (!bcast.location) {
        const { latitude: lat, longitude: lng } = await Geolocation.getCurrentPosition()?.then(_ => _.coords);
        bcast = { ...bcast, location: { lat, lng } };
      }
      const bcastId = await this.bcastService.bcast.insert(bcast);
      await this.bcastService.bcast.join(bcastId);
      this.dataService.refreshBcastList.set(true);
      this.initForm = true;
      this.router.navigate(['bcast', 'list']);
    } catch (error) {
      const message = utilsFns.getErrorMsgFromCatchBlock(error);
      toast.fail(message);
    }
    this.loaderService.hide();
  }

}
