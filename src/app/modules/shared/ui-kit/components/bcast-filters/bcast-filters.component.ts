import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DEFALT_FILTERS } from 'src/constants';
import { BcastFilters } from 'src/interfaces/bcast-filters';

@Component({
  selector: 'app-bcast-filters',
  templateUrl: './bcast-filters.component.html',
  styleUrls: ['./bcast-filters.component.scss'],
})
export class BcastFiltersComponent {

  @ViewChild(IonModal) modal: IonModal;

  @Input() filters: BcastFilters = DEFALT_FILTERS;
  @Output() filtersChange = new EventEmitter<BcastFilters>(null);
  
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

}
