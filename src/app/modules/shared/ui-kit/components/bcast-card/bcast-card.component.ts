import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import dateFns from 'src/functions/date-fns';
import { IListedBcast } from 'src/interfaces/listed-bcast';

@Component({
  selector: 'app-bcast-card',
  templateUrl: './bcast-card.component.html',
  styleUrls: ['./bcast-card.component.scss'],
})
export class BcastCardComponent implements OnChanges {

  @Input() listedBcast: IListedBcast;
  @Input() userTag: string[];

  @Output() join = new EventEmitter(null);
  @Output() chat = new EventEmitter(null);

  public dateFns = dateFns;

  constructor() { }

  ngOnChanges(change) {
    // in questo hook puoi intercettare tutti i cambiamenti sulle prop di input @Input()
    console.log('ngOnChanges hook');
    console.log(change)
  }

  onJoin() {
    this.join.emit(this.listedBcast.id);
  }

  onChat() {
    this.chat.emit(this.listedBcast.id);
  }


}
