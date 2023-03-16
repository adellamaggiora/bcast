import { Component } from '@angular/core';
import client from 'src/api/client';
import { ICandidateBcast } from 'src/interfaces/candidate-bcast';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {

  candidateBcast: ICandidateBcast[];
  window = window

  constructor() { 
    this.getCandidateBcast();
  }

  async getCandidateBcast() {
    // this.candidateBcast = await client.bcast.getCandidate('b95c1217-c98e-44f6-a0f7-aa5ad46f750a')({
    //     lat: 43.02344,
    //     lng: 11.01233
    //   })(['figa', 'mio', 'tuo', 'fia'])
  }

  

}
