import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMessage } from 'src/interfaces/message';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {

  message: string = '';
  messages: IMessage[];
  bcastId: string;
  userId: string;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private userService: UserService) { }

  async ngOnInit() {
    this.userId = await this.userService.userSession.getId();
    this.bcastId = this.route.snapshot.paramMap.get('id');
    this.messages = await this.chatService.message.get(this.bcastId);
    this.chatService.message.listen(this.bcastId)
      .subscribe(message => this.messages.push(message))
  }

  sendMessage() {
    this.chatService.message.send(this.bcastId, `${this.message}`);
    this.clearMessage();
  }

  clearMessage() {
    this.message = '';
  }

  isMyMessage(message: IMessage) {
    return message.userId === this.userId;
  }

}
