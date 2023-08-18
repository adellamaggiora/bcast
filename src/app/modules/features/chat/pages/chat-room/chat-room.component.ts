import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonContent } from "@ionic/angular";
import dateFns from "src/functions/date-fns";
import { IMessage } from "src/interfaces/message";
import { ChatService } from "src/services/chat.service";
import { UserService } from "src/services/user.service";
import { Keyboard } from "@capacitor/keyboard";

@Component({
  selector: "app-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.scss"],
})
export class ChatRoomComponent {
  message: string = "";
  messages: IMessage[];
  bcastId: string;
  userId: string;
  dateFns = dateFns;

  @ViewChild("chatContainer")
  private chatContainer: IonContent;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public chatService: ChatService
  ) {}

  async ngAfterViewInit() {
    this.userId = await this.userService.userSession.getUserId();
    this.bcastId = this.route.snapshot.paramMap.get("id");
    this.messages = await this.chatService.message.getAll(this.bcastId);
    this.chatService.message.listen(this.bcastId)
      .subscribe((message) => {
        this.messages.push(message);
        this.scrollToBottom();
      });
    Keyboard.addListener("keyboardDidShow", (info) => {
      this.chatContainer.scrollToBottom(100);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      this.chatContainer.scrollToBottom(100);
    });
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatContainer.scrollToBottom(100);
    }, 300);
  }

  sendMessage() {
    this.chatService.message.send(this.bcastId, `${this.message}`);
    this.clearMessage();
  }

  clearMessage() {
    this.message = "";
  }

  isMyMessage(message: IMessage) {
    return message.userId === this.userId;
  }
}
