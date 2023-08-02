import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loader$ = new BehaviorSubject<{ isLoading: boolean, message: string }>({
    isLoading: false,
    message: ''
  });
  
  private _get$() {
    return this._loader$.asObservable().pipe(share())
  }

  //#region public API
  show(message?: string) { this._loader$.next({ message: message, isLoading: true }) };

  hide() { this._loader$.next({ message: '', isLoading: false }) };

  isVisible$() { 
    return this._get$()
      .pipe(
        map(_ => _.isLoading)
      )
  };

  getMessage$() {
    return this._get$()
    .pipe(
      map(_ => _.message)
    )
  }
  //#endregion

  constructor() { }
}
