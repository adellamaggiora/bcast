import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMessage } from 'src/interfaces/message';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {

  messages: IMessage[];
  bcastId: string;

  constructor(private route: ActivatedRoute, private chatService: ChatService) { }

  async ngOnInit() {
    this.bcastId = this.route.snapshot.paramMap.get('id');
    this.messages = await this.chatService.message.get(this.bcastId);
    this.chatService.message.listen(this.bcastId)
      .subscribe(message => this.messages.push(message))
  }

  sendMessage(message: string) {
    this.chatService.message.send(this.bcastId, message);
  }

}
