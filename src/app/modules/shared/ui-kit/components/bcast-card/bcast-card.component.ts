import { Component, EventEmitter, Input, Output } from '@angular/core';
import dateFns from 'src/functions/date-fns';
import { IBcast } from 'src/interfaces/bcast';
import { IGeoLocation } from 'src/interfaces/geo-location';

@Component({
  selector: 'app-bcast-card',
  templateUrl: './bcast-card.component.html',
  styleUrls: ['./bcast-card.component.scss'],
})
export class BcastCardComponent {

  @Input() bcast: IBcast;
  @Input() joined: boolean;
  @Input() userTag: string[];

  @Output() join = new EventEmitter(null);
  @Output() hide = new EventEmitter(null);
  @Output() chat = new EventEmitter(null);

  public dateFns = dateFns;

  constructor() { }

  onJoin() {
    this.join.emit(this.bcast.id);
  }

  onHide() {
    this.hide.emit(this.bcast.id);
  }

  onChat() {
    this.chat.emit(this.bcast.id);
  }


}
