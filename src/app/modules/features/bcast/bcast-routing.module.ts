import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BcastComponent } from './components/bcast/bcast.component';
import { BcastListComponent } from './components/bcast-list/bcast-list.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { BcastCreationComponent } from './components/bcast-creation/bcast-creation.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: BcastComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'list',
        component: BcastListComponent
      },
      {
        path: 'create',
        component: BcastCreationComponent
      },
      {
        // path: 'chatroom/:id',
        path: 'chatroom',
        component: ChatRoomComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcastRoutingModule { }
