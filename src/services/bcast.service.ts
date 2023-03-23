import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';
import client from 'src/api/client';
import { ICandidateBcast } from 'src/interfaces/candidate-bcast';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BcastService {

  private _candidateBcast$: BehaviorSubject<ICandidateBcast[]> = new BehaviorSubject(null);

  constructor(private authService: AuthService) { }


  public updateCandidates(candidateBcast: ICandidateBcast[]) { 
    this._candidateBcast$.next(candidateBcast);
  }

  public getCandidates$() {
    return this._candidateBcast$.asObservable().pipe(share());
  }

  public getCandidates() {
    return this._candidateBcast$.getValue();
  }

  public async fetchCandidates() {
    const userId = this.authService.getUserId();
    await client.bcast.getCandidate(userId)
  }
  

  


}
