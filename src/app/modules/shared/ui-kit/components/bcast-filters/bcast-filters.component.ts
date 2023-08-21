import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DEFALT_FILTERS } from 'src/constants';
import { IBcastFilters } from 'src/interfaces/bcast-filters';

enum ModalContentEnum {
  All = 'all',
  Availabilty = 'availability',
  Distance = 'distance',
  Tag = 'tag',
  Partecipation = 'partecipation',
  Author = 'author'
};

@Component({
  selector: 'app-bcast-filters',
  templateUrl: './bcast-filters.component.html',
  styleUrls: ['./bcast-filters.component.scss'],
})
export class BcastFiltersComponent {

  ModalContentEnum = ModalContentEnum;

  @ViewChild(IonModal) modal: IonModal;

  @Input() filters: IBcastFilters = DEFALT_FILTERS;
  @Output() filtersChange = new EventEmitter<IBcastFilters>(null);

  modalContent: ModalContentEnum;
  
  constructor() { }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('some value', 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      window.alert(`Hello, ${ev.detail.data}!`);
    }
  }

  openModal(modalContent: ModalContentEnum) {
    this.modalContent = modalContent;
    this.modal.present();
  }

}
