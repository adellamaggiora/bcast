import { Component, Input, OnChanges } from '@angular/core';
import dateFns from 'src/functions/date-fns';
import { IListedBcast } from 'src/interfaces/listed-bcast';

@Component({
  selector: 'app-bcast-card-list',
  templateUrl: './bcast-card-list.component.html',
  styleUrls: ['./bcast-card-list.component.scss'],
})
export class BcastCardListComponent implements OnChanges {

  @Input() listedBcast: IListedBcast;
  @Input() matchingTag: string[];
  // output example
  // @Output() chat = new EventEmitter<string>(null);

  dateFns = dateFns;
  imageSrc: string;

  constructor() { }

  ngOnChanges(changes) {
    // in questo hook puoi intercettare tutti i cambiamenti sulle prop di input @Input()
    console.log('ngOnChanges hook');
    console.log(changes);

    if (changes?.listedBcast?.currentValue) {
      const image: File = changes?.listedBcast?.currentValue?.image;
      this.setImageSrc(image);
    }
  }

  setImageSrc(imageFile: File) {
    if (imageFile) {
      this.imageSrc = URL.createObjectURL(imageFile);
    } else {
      this.imageSrc = "https://ionicframework.com/docs/img/demos/card-media.png";
    }
  }


}
