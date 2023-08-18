import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UiKitModule } from '../../shared/ui-kit/ui-kit.module';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { ChatComponent } from './pages/chat/chat.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    IonicModule,
    UiKitModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
