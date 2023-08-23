import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcastCardListComponent } from './components/bcast-card-list/bcast-card-list.component';
import { IonicModule } from '@ionic/angular';
import { BcastFiltersComponent } from './components/bcast-filters/bcast-filters.component';
import { BcastTemplateComponent } from './components/bcast-template/bcast-template.component';
import { MapPreviewComponent } from './components/map-preview/map-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MapExplorerComponent } from './components/map-explorer/map-explorer.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { MetersToKmPipe } from './pipes/meters-to-km.pipe';
import { BcastCardDetailComponent } from './components/bcast-card-detail/bcast-card-detail.component';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { TagChipsComponent } from './components/tag-chips/tag-chips.component';
import { BcastCardListSkeletonComponent } from './components/bcast-card-list-skeleton/bcast-card-list-skeleton.component';
import { BcastCardDetailSkeletonComponent } from './components/bcast-card-detail-skeleton/bcast-card-detail-skeleton.component';


@NgModule({
  declarations: [
    BcastCardListComponent,
    BcastFiltersComponent,
    BcastTemplateComponent,
    LoginFormComponent,
    MapExplorerComponent,
    MapPreviewComponent,
    LocationSelectorComponent,
    MetersToKmPipe,
    BcastCardDetailComponent,
    ImageCropperComponent,
    TagChipsComponent,
    BcastCardListSkeletonComponent,
    BcastCardDetailSkeletonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BcastCardListComponent,
    BcastFiltersComponent,
    BcastTemplateComponent,
    LoginFormComponent,
    MapExplorerComponent,
    MapPreviewComponent,
    LocationSelectorComponent,
    MetersToKmPipe,
    BcastCardDetailComponent,
    ImageCropperComponent,
    TagChipsComponent,
    BcastCardListSkeletonComponent,
    BcastCardDetailSkeletonComponent
  ]
})
export class UiKitModule { }
