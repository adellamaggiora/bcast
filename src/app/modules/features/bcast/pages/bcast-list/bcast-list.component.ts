import { Component, OnInit } from "@angular/core";
import { BcastService } from "src/services/bcast.service";
import { UserService } from "src/services/user.service";
import { IGeoLocation } from "src/interfaces/geo-location";
import { Router } from "@angular/router";
import { IListedBcast } from "src/interfaces/listed-bcast";
import { DataService } from "src/services/data.service";
import { IBcastFilters } from "src/interfaces/filters/bcast-filters";
import { toast } from "src/functions/notifiers/toast";

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
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.refreshBcastList.get$().subscribe(async (refresh) => {
      if (refresh) {
        this.dataService.refreshBcastList.set(false);
        this.dataService.selectedLocation.get$().subscribe(
          async (selectedLocation) => {
            const location = await this.getLocation(selectedLocation);
            await this.fetchBcastList(location);
          }
        );
      }
    });
  }

  async fetchBcastList(location: IGeoLocation) {
    this.isLoading = true;
    try {
      await this.bcastService.filters.fetch();
      const filters = await this.bcastService?.filters?.get();
      await this.bcastService.bcastList.fetch(location, filters);
    } catch (error) {
      toast.fail(error?.message || error);
    } finally {
      this.isLoading = false;
    }
  }

  async handleRefresh(evt: any) {
    const selectedLocation = this.dataService.selectedLocation.get();
    const location = await this.getLocation(selectedLocation, true);
    await this.fetchBcastList(location);
    evt.target.complete();
  }

  onBcastCardClick(listedBcast: IListedBcast) {
    this.router.navigate(["bcast", "detail", listedBcast.id]);
  }

  async onFiltersChange(filters: IBcastFilters) {
    try {
      await this.bcastService.filters.set(filters);
      const selectedLocation = this.dataService.selectedLocation.get();
      const location = await this.getLocation(selectedLocation);
      await this.fetchBcastList(location);
    } catch (error) {
      toast.fail(error?.message || error);
    }
  }

  async getLocation(selectedLocation: IGeoLocation, fetchUserLocation?: boolean) {
    let location: IGeoLocation;
    if (selectedLocation?.lat && selectedLocation?.lng) {
      location = selectedLocation;
    }
    else {
      if (fetchUserLocation || !this.dataService.userLocation.get()) {
        await this.dataService.userLocation.fetch();
      }
      location = this.dataService.userLocation.get();
    }
    return location;
  }

}
