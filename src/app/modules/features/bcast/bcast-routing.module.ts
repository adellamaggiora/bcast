import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BcastComponent } from './components/bcast/bcast.component';
import { BcastListComponent } from './components/bcast-list/bcast-list.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

const routes: Routes = [
  {
    path: '',
    component: BcastComponent,
    children: [
      {
        path: 'list',
        component: BcastListComponent
      },
      {
        path: 'chatlist',
        component: ChatListComponent
      },
      {
        // path: 'chatroom/:id',
        path: 'chatroom',
        component: ChatRoomComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcastRoutingModule { }
