import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';

const routes: Routes = [
  {
    path: "",
    component: ChatComponent,
    children: [
      {
        path: ":id",
        component: ChatRoomComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
