import { Component, OnInit } from "@angular/core";
import { BcastService } from "src/services/bcast.service";
import { UserService } from "src/services/user.service";
import { Geolocation } from "@capacitor/geolocation";
import { IGeoLocation } from "src/interfaces/geo-location";
import { Router } from "@angular/router";
import { IListedBcast } from "src/interfaces/listed-bcast";
import { DataService } from "src/services/data.service";

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
  ) {}

  ngOnInit() {
    this.dataService.refreshBcastList.get$().subscribe(async (refresh) => {
      if (refresh) {
        const selectedLocation = this.dataService.selectedLocation.get();
        this.fetchBcastList(selectedLocation);
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
    this.isLoading = true;
    try {
      if (selectedLocation) {
        await this.bcastService.bcastList.fetch(selectedLocation);
      } else {
        const coordinates = await Geolocation.getCurrentPosition();
        if (coordinates?.coords) {
          const { latitude: lat, longitude: lng } = coordinates?.coords;
          await this.bcastService.bcastList.fetch({ lat, lng });
        }
      }
    } catch (error) {
      window.alert(error);
    } finally {
      this.isLoading = false;
    }
  }

  async handleRefresh(evt: any) {
    const selectedLocation = this.dataService.selectedLocation.get();
    await this.fetchBcastList(selectedLocation);
    evt.target.complete();
  }

  onBcastCardClick(listedBcast: IListedBcast) {

    // @todo attivare la navigazione diretta sulla chat se è già stato fatto il join?
    // al momento viene sempre fatta la navigazione sul dettaglio del bcast.

    // if (listedBcast.joined) {
    //   this.router.navigate(['chat', listedBcast.id]);
    // }
    // else {
    //   this.router.navigate(['bcast', 'detail', listedBcast.id]);
    // }

    this.router.navigate(["bcast", "detail", listedBcast.id]);
  }
}
