import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import dateFns from 'src/functions/date-fns';
import { IBcastDetail } from 'src/interfaces/bcast-detail';
@Component({
  selector: 'app-bcast-card-detail',
  templateUrl: './bcast-card-detail.component.html',
  styleUrls: ['./bcast-card-detail.component.scss'],
})
export class BcastCardDetailComponent  implements OnInit {

  @Input() bcastDetail: IBcastDetail;
  @Input() favoriteTag: string[] = [];

  @Output() chat = new EventEmitter<string>(null);
  @Output() join = new EventEmitter<string>(null);

  dateFns = dateFns;
  imageSrc: string;

  constructor() { }

  ngOnInit() {
    console.log(this.bcastDetail)
  }

  onChatClick() {
    this.chat.emit(this.bcastDetail.id);
  }

  ngOnChanges(changes) {
    // in questo hook puoi intercettare tutti i cambiamenti sulle prop di input @Input()
    console.log('ngOnChanges hook');
    console.log(changes);

    if (changes?.bcastDetail?.currentValue) {
      const image: File = changes?.bcastDetail?.currentValue?.image;
      this.setImageSrc(image);
    }
  }

  onJoinClick() {
    this.join.emit(this.bcastDetail.id);
  }

  setImageSrc(imageFile: File) {
    if (imageFile) {
      this.imageSrc = URL.createObjectURL(imageFile);
    } else {
      this.imageSrc = "assets/pictures/card-media-resized.png";
    }
  }

  showLocation() {
    window.alert('@todo show location')
  }

}
