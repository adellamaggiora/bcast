import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent  implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const bcastId = this.route.snapshot.paramMap.get('id');
    console.log(bcastId);
  }

}
