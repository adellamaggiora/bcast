import { Component, OnInit } from '@angular/core';
import { BcastService } from 'src/services/bcast.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent  implements OnInit {

  constructor(public bcastService: BcastService) { }

  ngOnInit() {}


  getChatList() {
    
  }

}
