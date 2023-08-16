import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IBcastDetail } from "src/interfaces/bcast-detail";
import { BcastService } from "src/services/bcast.service";
import { LoaderService } from "src/services/loader.service";
import { ActivatedRoute } from "@angular/router";
import { Geolocation } from "@capacitor/geolocation";

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
    private loader: LoaderService,
    private route: ActivatedRoute,
  ) {}

  async ionViewWillEnter() {
    this.loader.show("Loading braodcast...");

    this.route.params.subscribe(async (params) => {
      try {
        const bcastId = params["id"];
        const coordinates = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = coordinates.coords;
        this.bcastDetail = await this.bcastService.bcast.getDetail(bcastId, {
          lng: longitude,
          lat: latitude,
        });
      } catch (error) {
        window.alert(error);
      } finally {
        this.loader.hide();
      }
    });
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
