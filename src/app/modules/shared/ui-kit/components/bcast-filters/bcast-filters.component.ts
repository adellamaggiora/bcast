import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-bcast-filters',
  templateUrl: './bcast-filters.component.html',
  styleUrls: ['./bcast-filters.component.scss'],
})
export class BcastFiltersComponent {

  @ViewChild(IonModal) modal: IonModal;
  name: string;

  constructor() { }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      window.alert(`Hello, ${ev.detail.data}!`);
    }
  }

}
