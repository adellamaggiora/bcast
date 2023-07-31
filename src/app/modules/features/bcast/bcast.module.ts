import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastRoutingModule } from './bcast-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BcastComponent } from './pages/bcast/bcast.component';
import { BcastListComponent } from './pages/bcast-list/bcast-list.component';
import { UiKitModule } from '../../shared/ui-kit/ui-kit.module';
import { ChatListComponent } from './pages/chat-list/chat-list.component';
import { RouteReuseStrategy } from '@angular/router';
import { BcastCreationComponent } from './pages/bcast-creation/bcast-creation.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { HomeComponent } from './pages/home/home.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

@NgModule({
  declarations: [
    BcastComponent,
    BcastCreationComponent,
    BcastListComponent,
    ChatListComponent,
    ChatRoomComponent,
    HomeComponent,
    NotificationsComponent
  ],
  imports: [
    BcastRoutingModule,
    CommonModule, 
    IonicModule,
    UiKitModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class BcastModule { }
