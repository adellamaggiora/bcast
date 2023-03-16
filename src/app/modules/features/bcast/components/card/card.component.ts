import { Component, Input } from '@angular/core';
import dateFns from 'src/functions/date-fns';
import { geoFns } from 'src/functions/geo-fns';
import { gisFns } from 'src/functions/gis-fns';
import { IBcast } from 'src/interfaces/bcast';
import { IGeoLocation } from 'src/interfaces/geo-location';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {

  @Input() bcast: IBcast;
  @Input() userLocation: IGeoLocation;
  @Input() joined: boolean;

  public dateFns = dateFns;
  public gisFns = gisFns;

}
