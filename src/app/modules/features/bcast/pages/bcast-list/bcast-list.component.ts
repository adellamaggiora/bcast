import { Component, OnInit } from "@angular/core";
import { BcastService } from "src/services/bcast.service";
import { UserService } from "src/services/user.service";
import { Geolocation } from "@capacitor/geolocation";
import { IGeoLocation } from "src/interfaces/geo-location";
import { Router } from "@angular/router";
import { IListedBcast } from "src/interfaces/listed-bcast";
import { DataService } from "src/services/data.service";
import { IBcastFilters } from "src/interfaces/filters/bcast-filters";
import { toast } from "src/functions/notifiers/toast";
import { LoaderService } from "src/services/loader.service";

@Component({
  selector: "app-bcast-list",
  templateUrl: "./bcast-list.component.html",
  styleUrls: ["./bcast-list.component.scss"],
})
export class BcastListComponent implements OnInit {

  isLoading: boolean;

  constructor(
    public bcastService: BcastService,
    public userService: UserService,
    private dataService: DataService,
    private router: Router,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.dataService.refreshBcastList.get$().subscribe(async (refresh) => {
      if (refresh) {
        this.dataService.refreshBcastList.set(false);
        this.dataService.selectedLocation.get$().subscribe(
          async (selectedLocation) => {
            this.fetchBcastList(selectedLocation);
          },
        );
      }
    });
  }

  async fetchBcastList(selectedLocation: IGeoLocation | null) {
    this.loaderService.show('Fetching list...');
    this.isLoading = true;
    try {
      await this.bcastService.filters.fetch();
      const filters = await this.bcastService?.filters?.get();
      if (selectedLocation) {
        await this.bcastService.bcastList.fetch(selectedLocation, filters);
      } else {
        const coordinates = await Geolocation.getCurrentPosition();
        if (coordinates?.coords) {
          const { latitude: lat, longitude: lng } = coordinates?.coords;
          await this.bcastService.bcastList.fetch({ lat, lng }, filters);
        }
      }
    } catch (error) {
      toast.fail(error?.message || error);
    } finally {
      this.isLoading = false;
      this.loaderService.hide();
    }
  }

  async handleRefresh(evt: any) {
    const selectedLocation = this.dataService.selectedLocation.get();
    await this.fetchBcastList(selectedLocation);
    evt.target.complete();
  }

  onBcastCardClick(listedBcast: IListedBcast) {

    // if (listedBcast.joined) {
    //   this.router.navigate(['chat', listedBcast.id]);
    // }
    // else {
    //   this.router.navigate(['bcast', 'detail', listedBcast.id]);
    // }

    this.router.navigate(["bcast", "detail", listedBcast.id]);
  }

  async onFiltersChange(filters: IBcastFilters) {
    try {
      await this.bcastService.filters.set(filters);
      const location = this.dataService.selectedLocation.get();
      await this.fetchBcastList(location);
    } catch (error) {
      toast.fail(error?.message || error);
    }
  }

}
