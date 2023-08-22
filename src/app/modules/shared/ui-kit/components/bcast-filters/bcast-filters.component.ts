import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { BcastFiltersFormValidartor } from './bcast-filters-form-validator';
import { IBcastFilters } from 'src/interfaces/filters/bcast-filters';

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


  @ViewChild(IonModal) modal: IonModal;

  @Input() filters: IBcastFilters;
  @Output() filtersChange = new EventEmitter<IBcastFilters>(null);

  ModalContentEnum = ModalContentEnum;
  modalContent: ModalContentEnum;
  formValidator: BcastFiltersFormValidartor;

  constructor() {
    this.initFormValidator();
  }

  ngOnChanges(changes) {
    if (changes?.filters?.currentValue) {
      this.initFormValidator();
    }
  }

  initFormValidator() {
    this.formValidator = new BcastFiltersFormValidartor(this.filters);
  }

  cancel() {
    this.initFormValidator();
    this.modal.dismiss();
  }

  confirm() {
    this.emitFilters();
    this.modal.dismiss();
  }

  openModal(modalContent: ModalContentEnum) {
    this.modalContent = modalContent;
    this.modal.present();
  }

  showModalContent(modalContent: ModalContentEnum) {
    return this.modalContent === modalContent || this.modalContent === ModalContentEnum.All;
  }

  emitFilters() {
    const filters = this.formValidator.formGroup.value;
    this.filtersChange.emit(filters);
  }

  clearFilter(type: ModalContentEnum) {
    switch (type) {
      case ModalContentEnum.Distance:
        this.formValidator.clearDistanceFilters();
        break;
      case ModalContentEnum.Tag:
        this.formValidator.clearTagFilters();
        break;
      case ModalContentEnum.Availabilty:
        this.formValidator.clearAvailabilityFilters();
        break;
      case ModalContentEnum.Partecipation:
        this.formValidator.clearPartecipationFilters();
        break;
      case ModalContentEnum.Author:
        this.formValidator.clearAuthorFilters();
        break;
      case ModalContentEnum.All:
        this.formValidator.clearAllFilters();
        break;
      default:
        break;
    }
    this.confirm();
  }

}
