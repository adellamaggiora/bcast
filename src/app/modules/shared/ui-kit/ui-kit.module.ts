import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastCardComponent } from './components/bcast-card/bcast-card.component';
import { IonicModule } from '@ionic/angular';
import { BcastDetailComponent } from './components/bcast-detail/bcast-detail.component';
import { BcastFiltersComponent } from './components/bcast-filters/bcast-filters.component';
import { BcastTemplateComponent } from './components/bcast-template/bcast-template.component';


@NgModule({
  declarations: [
    BcastCardComponent,
    BcastDetailComponent,
    BcastFiltersComponent,
    BcastTemplateComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BcastCardComponent,
    BcastDetailComponent,
    BcastFiltersComponent,
    BcastTemplateComponent
  ]
})
export class UiKitModule { }
