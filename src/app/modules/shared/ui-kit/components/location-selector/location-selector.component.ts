import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { IGeoLocation } from 'src/interfaces/geo-location';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent {

  @ViewChild(IonModal) modal: IonModal;

  @Input() location: IGeoLocation;
  @Output() selectedLocation = new EventEmitter<IGeoLocation>(null);

  constructor() { }

  onSelectedLocation(location: IGeoLocation) {
    this.location = location;
    this.modal.dismiss();
    this.emitLocation();
  }

  clearLocation() {
    this.location = null;
    this.emitLocation();
  }

  emitLocation() {
    this.selectedLocation.emit(this.location);
  }

  openModal() {
    this.modal.present()
  }

}
