import { Component } from '@angular/core';
import { IBcast } from 'src/interfaces/bcast';
import { IGeoLocation } from 'src/interfaces/geo-location';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {

  public bcastTest: IBcast = {
    content: {
      title: 'Trekking',
      message: 'Anyone wants to have a trekking on Saturday? Probably it will be monte Corchia'
    },
    expiresAt: new Date(),
    location: {
      lat: 44.32456,
      lng: 11.00234
    },
    maxUsers: 5,
    maxDistanceKm: 50,
    tag: ['trekkingaaaaaaaa', 'mountain', 'sport', 'fun', 'friends']
  }

  public userLocationTest: IGeoLocation = {
    lat: 44.1232,
    lng: 10.4567
  }

}
