import { Component, OnInit } from '@angular/core';
import { BcastService } from 'src/services/bcast.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent  implements OnInit {

  constructor(public bcastService: BcastService, public userService: UserService) { }

  ngOnInit() {
    this.bcastService.chatList.fetch();
  }
  
}
