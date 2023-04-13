import { Component, EventEmitter, Input, Output } from '@angular/core';
import dateFns from 'src/functions/date-fns';
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
  @Input() userTag: string[];

  @Output() join = new EventEmitter(false);
  @Output() hide = new EventEmitter(false);

  public dateFns = dateFns;

  onJoin() {
    this.join.emit(true);
  }

  onHide() {
    this.hide.emit(true);
  }



}
