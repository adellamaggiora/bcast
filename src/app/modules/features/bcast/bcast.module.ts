import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastRoutingModule } from './bcast-routing.module';
import { IonicModule } from '@ionic/angular';
import { BcastComponent } from './components/bcast/bcast.component';
import { CandidateBcastComponent } from './components/candidate-bcast/candidate-bcast.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UiKitModule } from '../../shared/ui-kit/ui-kit.module';
import { ChatListComponent } from './components/chat-list/chat-list.component';

@NgModule({
  declarations: [
    BcastComponent,
    CandidateBcastComponent,
    ChatListComponent
  ],
  imports: [
    BcastRoutingModule,
    CommonModule, 
    IonicModule,
    UiKitModule
  ],
  providers: [
    Geolocation
  ]
})
export class BcastModule { }
