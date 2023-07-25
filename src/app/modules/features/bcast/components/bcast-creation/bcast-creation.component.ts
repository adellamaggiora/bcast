import { Component, OnInit } from '@angular/core';
import { IBcast } from 'src/interfaces/bcast';
import { BcastService } from 'src/services/bcast.service';

@Component({
  selector: 'app-bcast-creation',
  templateUrl: './bcast-creation.component.html',
  styleUrls: ['./bcast-creation.component.scss'],
})
export class BcastCreationComponent implements OnInit {

  constructor(private bcastService: BcastService) { }

  ngOnInit() { }

  async onSaveBcast(bcast: Partial<IBcast>) {
    await this.bcastService.bcast.insert(bcast);
  }

}
