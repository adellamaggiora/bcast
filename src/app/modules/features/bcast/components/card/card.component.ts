import { Component, Input } from '@angular/core';
import dateFns from 'src/functions/date-fns';
import { IGeoLocation } from 'src/interfaces/geo-location';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {

  @Input() bcast: any //IBcast | ICandidateBcast;
  @Input() userLocation: IGeoLocation;
  @Input() joined: boolean;

  public dateFns = dateFns;

}
