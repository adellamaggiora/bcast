import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastCardComponent } from './components/bcast-card/bcast-card.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    BcastCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BcastCardComponent
  ]
})
export class UiKitModule { }
