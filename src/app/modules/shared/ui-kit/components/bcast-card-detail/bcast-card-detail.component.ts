import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBcastDetail } from 'src/interfaces/bcast-detail';

@Component({
  selector: 'app-bcast-card-detail',
  templateUrl: './bcast-card-detail.component.html',
  styleUrls: ['./bcast-card-detail.component.scss'],
})
export class BcastCardDetailComponent  implements OnInit {

  @Input() bcastDetail: IBcastDetail;

  @Output() chat = new EventEmitter<string>(null);
  @Output() join = new EventEmitter<string>(null);

  constructor() { }

  ngOnInit() {}

  onChatClick() {
    this.chat.emit(this.bcastDetail.id);
  }

  onJoinClick() {
    this.join.emit(this.bcastDetail.id);
  }

}
