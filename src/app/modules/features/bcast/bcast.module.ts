import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastRoutingModule } from './bcast-routing.module';
import { IonicModule } from '@ionic/angular';
import { BcastComponent } from './components/bcast/bcast.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { JoinedComponent } from './components/joined/joined.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UiKitModule } from '../../shared/ui-kit/ui-kit.module';

@NgModule({
  declarations: [
    BcastComponent,
    CandidateComponent,
    JoinedComponent
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
