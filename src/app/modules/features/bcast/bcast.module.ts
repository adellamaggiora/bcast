import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastRoutingModule } from './bcast-routing.module';
import { IonicModule } from '@ionic/angular';
import { BcastComponent } from './components/bcast/bcast.component';
import { CardComponent } from './components/card/card.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { JoinedComponent } from './components/joined/joined.component';

@NgModule({
  declarations: [
    BcastComponent,
    CardComponent,
    CandidateComponent,
    JoinedComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,
    BcastRoutingModule
  ]
})
export class BcastModule { }
