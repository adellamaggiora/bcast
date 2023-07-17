import { Component, EventEmitter, Input, Output } from '@angular/core';
import dateFns from 'src/functions/date-fns';
import { IListedBcast } from 'src/interfaces/listed-bcast';

@Component({
  selector: 'app-bcast-card',
  templateUrl: './bcast-card.component.html',
  styleUrls: ['./bcast-card.component.scss'],
})
export class BcastCardComponent {

  @Input() listedBcast: IListedBcast;
  @Input() userTag: string[];

  @Output() join = new EventEmitter(null);
  @Output() chat = new EventEmitter(null);

  public dateFns = dateFns;

  constructor() { }

  onJoin() {
    this.join.emit(this.listedBcast.id);
  }

  onChat() {
    this.chat.emit(this.listedBcast.id);
  }


}
