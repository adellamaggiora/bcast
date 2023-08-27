import { Injectable } from "@angular/core";
import { BehaviorSubject, share } from "rxjs";
import { IGeoLocation } from "src/interfaces/geo-location";
import { Geolocation } from "@capacitor/geolocation";
import { toast } from "src/functions/notifiers/toast";
import { IonModal } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private _selectedLocation$ = new BehaviorSubject<IGeoLocation>(null);
  private _userLocation$ = new BehaviorSubject<IGeoLocation>(null);
  private _refreshBcastList$ = new BehaviorSubject<boolean>(true);
  private _currentModal$ = new BehaviorSubject<IonModal>(null);

  constructor() {}

  public selectedLocation = {
    get$: () => this._selectedLocation$.asObservable().pipe(share()),
    get: () => this._selectedLocation$.getValue(),
    set: (location: IGeoLocation) => this._selectedLocation$.next(location),
  };

  public userLocation = {
    get$: () => this._userLocation$.asObservable().pipe(share()),
    get: () => this._userLocation$.getValue(),
    fetch: async () => {
      try {
        console.log("::[fetching location]");
        const { coords: { longitude: lng, latitude: lat } } = await Geolocation
          .getCurrentPosition();
        this._userLocation$.next({ lat, lng });
      } catch (error) {
        toast.fail("Error during fetch location");
      }
    },
  };

  public refreshBcastList = {
    get$: () => this._refreshBcastList$.asObservable().pipe(share()),
    get: () => this._refreshBcastList$.getValue(),
    set: (refresh: boolean) => this._refreshBcastList$.next(refresh),
  };

  public currentModal = {
    get$: () => this._currentModal$.asObservable().pipe(share()),
    get: () => this._currentModal$.getValue(),
    set: (modal: IonModal) => {
      this._currentModal$.next(modal)
    }
  };
}
