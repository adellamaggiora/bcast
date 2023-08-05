import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IBcastDetail } from "src/interfaces/bcast-detail";
import { IListedBcast } from "src/interfaces/listed-bcast";
import { BcastService } from "src/services/bcast.service";
import { DataService } from "src/services/data.service";
import { Location } from "@angular/common";
import { LoaderService } from "src/services/loader.service";

@Component({
  selector: "app-bcast-detail",
  templateUrl: "./bcast-detail.component.html",
  styleUrls: ["./bcast-detail.component.scss"],
})
export class BcastDetailComponent {
  bcastDetail: IBcastDetail;

  constructor(
    private bcastService: BcastService,
    private router: Router,
    private dataService: DataService,
    private location: Location,
    private loader: LoaderService,
  ) {}

  async ionViewWillEnter() {
    this.loader.show("Loading braodcast...");
    try {
      const selectedListedBcast: IListedBcast = this.dataService.selectedListedBcast.get();
      if (selectedListedBcast) {
        const { joined, distMeters, id } = selectedListedBcast;
        const bcast = await this.bcastService.bcast.get(id);
        this.bcastDetail = { ...bcast, joined, distMeters };
      } else {
        this.location.back();
      }
    } catch (error) {
      this.loader.hide();
    }
    this.loader.hide();
  }

  ionViewDidLeave() {
    this.dataService.selectedListedBcast.set(null);
  }

  onChat(bcastId: string) {
    this.navigateToChat(bcastId);
  }

  async onJoin(bcastId: string) {
    await this.bcastService.bcast.join(this.bcastDetail.id);
    this.navigateToChat(bcastId);
  }

  navigateToChat(bcastId: string) {
    this.router.navigate(["bcast", "chat", bcastId]);
  }
}
