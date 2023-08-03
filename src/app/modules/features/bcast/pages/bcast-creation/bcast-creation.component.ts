import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'src/functions/notifiers/toast';
import { utilsFns } from 'src/functions/utils-fns';
import { IBcast } from 'src/interfaces/bcast';
import { BcastService } from 'src/services/bcast.service';
import { LoaderService } from 'src/services/loader.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-bcast-creation',
  templateUrl: './bcast-creation.component.html',
  styleUrls: ['./bcast-creation.component.scss'],
})
export class BcastCreationComponent implements OnInit {

  constructor(private bcastService: BcastService, private router: Router, private loaderService: LoaderService) { }

  ngOnInit() { }

  async onSaveBcast(bcast: Partial<IBcast>) {
    this.loaderService.show(`Saving broadcast...`);
    try {
      if (!bcast.location) {
        const { latitude: lat, longitude: lng } = await Geolocation.getCurrentPosition()?.then(_ => _.coords);
        bcast = { ...bcast, location: { lat, lng } };
      }
      await this.bcastService.bcast.insert(bcast);
      this.router.navigate(['bcast', 'list']);
    } catch (error) {
      const message = utilsFns.getErrorMsgFromCatchBlock(error);
      toast.fail(message);
    }
    this.loaderService.hide();
  }

}
