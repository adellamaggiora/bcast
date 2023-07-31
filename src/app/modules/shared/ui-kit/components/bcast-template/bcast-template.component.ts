import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IBcast } from 'src/interfaces/bcast';
import { BcastTemplateFormValidator } from './bcast-template-form-validator';
import { IonInput } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { BCAST_MAIN_IMAGE_NAME } from 'src/api/utils/api-utils';

@Component({
  selector: 'app-bcast-template',
  templateUrl: './bcast-template.component.html',
  styleUrls: ['./bcast-template.component.scss'],
})
export class BcastTemplateComponent  implements OnInit {

  @Output() saveBcast: EventEmitter<Partial<IBcast>> = new EventEmitter();

  imageSrc: string;
  image: File;
  formValidator: BcastTemplateFormValidator;

  constructor() { }

  ngOnInit() {
    this.formValidator = new BcastTemplateFormValidator();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    
    const response = await fetch(image.webPath);
    const blob = await response.blob();
    this.image = new File([blob], `${BCAST_MAIN_IMAGE_NAME}.${image.format}`, { type: blob.type });
    this.imageSrc = image.webPath;
  };

  async save() {
    try {
      const formValue = this.formValidator.formGroup.value;
      const location = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = location.coords;
      const bcast: Partial<IBcast> = {
        image: this.image,
        content: formValue.content,
        title: formValue.title,
        expiresAt: formValue.expiresAt,
        location: { lat: latitude, lng: longitude },
        tag: formValue.tag,
        maxUsers: formValue.maxUsers
      }
      this.saveBcast.emit(bcast);

    } catch (error) {
      window.alert('an error occourred');
    }
  }

  addTag(tagInput: IonInput) {
    const tag = tagInput.value as string;
    tagInput.value = '';
    this.formValidator.addTag(tag);
  }



}
