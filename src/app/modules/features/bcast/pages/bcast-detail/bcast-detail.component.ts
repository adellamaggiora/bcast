import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBcastDetail } from 'src/interfaces/bcast-detail';
import { BcastService } from 'src/services/bcast.service';

@Component({
  selector: 'app-bcast-detail',
  templateUrl: './bcast-detail.component.html',
  styleUrls: ['./bcast-detail.component.scss'],
})
export class BcastDetailComponent implements OnInit {

  bcastDetail: IBcastDetail;

  constructor(private route: ActivatedRoute, private bcastService: BcastService, private router: Router) { }

  async ngOnInit() {
    const queryParams = this.route.snapshot.queryParamMap;
    const joined = JSON.parse(queryParams.get('joined'));
    const distMeters = JSON.parse(queryParams.get('distMeters'));
    const bcastId = this.route.snapshot.paramMap.get('id');
    const bcast = await this.bcastService.bcast.get(bcastId);
    this.bcastDetail = { ...bcast, joined, distMeters };
  }

  onChat(bcastId: string) {
    this.navigateToChat(bcastId);
  }

  async onJoin(bcastId: string) {
    await this.bcastService.bcast.join(this.bcastDetail.id);
    this.navigateToChat(bcastId);
  }

  navigateToChat(bcastId: string) {
    this.router.navigate(['bcast', 'chat', this.bcastDetail.id]);
  }

}
