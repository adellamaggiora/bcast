import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IBcast } from 'src/interfaces/bcast';
import { BcastTemplateFormValidator } from './bcast-template-form-validator';
import { IonInput } from '@ionic/angular';
import { BCAST_MAIN_IMAGE_NAME } from 'src/constants';
import dateFns from 'src/functions/date-fns';
import { utilsFns } from 'src/functions/utils-fns';

@Component({
  selector: 'app-bcast-template',
  templateUrl: './bcast-template.component.html',
  styleUrls: ['./bcast-template.component.scss'],
})
export class BcastTemplateComponent  implements OnInit {
  
  @Input() initForm: boolean
  @Output() saveBcast: EventEmitter<Partial<IBcast>> = new EventEmitter();

  formValidator: BcastTemplateFormValidator;
  dateFns = dateFns;

  tempPhoto: {
    webPath: string;
    name: string;
  }

  constructor() { }

  ngOnInit() {
    this.initFormValidator();
  }

  ngOnChanges(changes) {
    if (changes?.initForm?.currentValue === true) {
      this.initFormValidator();
    }
  }

  initFormValidator() {
    this.formValidator = new BcastTemplateFormValidator();
  }

  async takePicture() {
    const photo = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    
    this.tempPhoto = { webPath: photo.webPath, name: `${BCAST_MAIN_IMAGE_NAME}.${photo.format}` };
  };

  async save() {
    try {
      const formValue = this.formValidator.formGroup.value;
      const bcast: Partial<IBcast> = {
        image: formValue.image,
        content: formValue.content,
        title: formValue.title,
        expiresAt: formValue.expiresAt,
        tag: formValue.tag,
        maxUsers: formValue.maxUsers
      }
      this.saveBcast.emit(bcast);
    } catch (error) {
      window.alert(error);
    }
  }

  onCroppedBase64(base64: string) {
    if (base64?.length) {
      const file = utilsFns.base64ToFile(base64, this.tempPhoto.name);
      this.formValidator.setImage(file, base64);
    }
    
  }


}
