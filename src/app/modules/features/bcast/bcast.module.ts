import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastRoutingModule } from './bcast-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BcastComponent } from './components/bcast/bcast.component';
import { BcastListComponent } from './components/bcast-list/bcast-list.component';
import { UiKitModule } from '../../shared/ui-kit/ui-kit.module';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { RouteReuseStrategy } from '@angular/router';
import { BcastCreationComponent } from './components/bcast-creation/bcast-creation.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

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
