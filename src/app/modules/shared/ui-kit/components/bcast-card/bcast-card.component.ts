import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
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

  @Output() join = new EventEmitter<string>(null);
  @Output() chat = new EventEmitter<string>(null);

  dateFns = dateFns;
  imageSrc: string;

  constructor() { }

  ngOnChanges(change) {
    // in questo hook puoi intercettare tutti i cambiamenti sulle prop di input @Input()
    console.log('ngOnChanges hook');
    console.log(change);

    if (change?.listedBcast?.currentValue) {
      const imageFile: File = change?.listedBcast?.currentValue?.imageFile;
      this.setImageSrc(imageFile);
    }
  }

  onJoin() {
    this.join.emit(this.listedBcast.id);
  }

  onChat() {
    this.chat.emit(this.listedBcast.id);
  }

  setImageSrc(imageFile: File) {
    if (imageFile) {
      this.imageSrc = URL.createObjectURL(imageFile);
    } else {
      this.imageSrc = "https://ionicframework.com/docs/img/demos/card-media.png";
    }
  }


}
