import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IBcastDetail } from "src/interfaces/bcast-detail";
import { BcastService } from "src/services/bcast.service";
import { ActivatedRoute } from "@angular/router";
import { toast } from "src/functions/notifiers/toast";
import { DataService } from "src/services/data.service";
import { IGeoLocation } from "src/interfaces/geo-location";

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
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  async ionViewWillEnter() {
    this.route.params.subscribe(async (params) => {
      try {
        const bcastId = params["id"];
        const selectedLocation = this.dataService.selectedLocation.get();
        let location: IGeoLocation;
        if (selectedLocation?.lat && selectedLocation?.lng) {
          location = selectedLocation
        }
        else {
          location = this.dataService.userLocation.get();
        }
        this.bcastDetail = await this.bcastService.bcast.getDetail(bcastId, location);
      } catch (error) {
        toast.fail(error?.message || error);
      }
    });
  }

  onChat(bcastId: string) {
    this.navigateToChat(bcastId);
  }

  async onJoin(bcastId: string) {
    try {
      await this.bcastService.bcast.join(this.bcastDetail.id);
      this.bcastService.bcast.clearDetailCache(this.bcastDetail.id);
      this.navigateToChat(bcastId);
    } catch (error) {
      toast.fail(error?.message || error);
    }
  }

  navigateToChat(bcastId: string) {
    this.router.navigate(["chat", bcastId]);
  }
}
