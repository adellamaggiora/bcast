import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastRoutingModule } from './bcast-routing.module';
import { IonicModule } from '@ionic/angular';
import { BcastComponent } from './components/bcast/bcast.component';

@NgModule({
  declarations: [
    BcastComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,
    CommonModule,
    BcastRoutingModule
  ]
})
export class BcastModule { }
