import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBcast } from 'src/interfaces/bcast';
import { BcastService } from 'src/services/bcast.service';
import { LoaderService } from 'src/services/loader.service';

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
    await this.bcastService.bcast.insert(bcast);
    this.loaderService.hide();
    this.router.navigate(['bcast', 'list']);
  }

}
