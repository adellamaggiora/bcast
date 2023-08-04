import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';
import { IGeoLocation } from 'src/interfaces/geo-location';
import { IListedBcast } from 'src/interfaces/listed-bcast';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _selectedLocation$ = new BehaviorSubject<IGeoLocation>(null);

  private _selectedListedBcast$ = new BehaviorSubject<IListedBcast>(null);

  private _refreshBcastList$ = new BehaviorSubject<boolean>(false);


  constructor() { }


  public selectedLocation = {
    get$: () => this._selectedLocation$.asObservable().pipe(share()),
    get: () => this._selectedLocation$.getValue(),
    set: (location: IGeoLocation) => this._selectedLocation$.next(location)
  }

  public selectedListedBcast = {
    get$: () => this._selectedListedBcast$.asObservable().pipe(share()),
    get: () => this._selectedListedBcast$.getValue(),
    set: (listedBcast: IListedBcast) => this._selectedListedBcast$.next(listedBcast)
  }

  public refreshBcastList = {
    get$: () => this._refreshBcastList$.asObservable().pipe(share()),
    get: () => this._refreshBcastList$.getValue(),
    set: (refresh: boolean) => this._refreshBcastList$.next(refresh)
  }

}
