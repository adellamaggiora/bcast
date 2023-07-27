import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastCardComponent } from './components/bcast-card/bcast-card.component';
import { IonicModule } from '@ionic/angular';
import { BcastDetailComponent } from './components/bcast-detail/bcast-detail.component';
import { BcastFiltersComponent } from './components/bcast-filters/bcast-filters.component';
import { BcastTemplateComponent } from './components/bcast-template/bcast-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    BcastCardComponent,
    BcastDetailComponent,
    BcastFiltersComponent,
    BcastTemplateComponent,
    LoginFormComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BcastCardComponent,
    BcastDetailComponent,
    BcastFiltersComponent,
    BcastTemplateComponent,
    LoginFormComponent,
    MapComponent
  ]
})
export class UiKitModule { }
