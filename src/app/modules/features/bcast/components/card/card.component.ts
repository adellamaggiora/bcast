import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() onJoin = new EventEmitter(false);
  @Output() onDiscard = new EventEmitter(false);

  public dateFns = dateFns;

}
