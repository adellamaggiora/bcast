import { Component } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import api from 'src/api/api';
import { supabaseUrl, supabaseKey } from 'src/api/constants';
import { IBcast } from 'src/interfaces/bcast';
import { ICandidateBcast } from 'src/interfaces/candidate-bcast';
import { IGeoLocation } from 'src/interfaces/geo-location';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {

  client
  candidateBcast: ICandidateBcast[];

  constructor() { 
    const client = createClient(supabaseUrl, supabaseKey);
    const cli = api(client);

  }

  async getCandidateBcast() {
    this.candidateBcast = await this.client.bcast.getCandidate('b95c1217-c98e-44f6-a0f7-aa5ad46f750a')({
        lat: 43.02344,
        lng: 11.01233
      })(['figa', 'mio', 'tuo', 'fia'])
  }

}
