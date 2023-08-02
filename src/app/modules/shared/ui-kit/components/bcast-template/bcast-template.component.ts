import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IBcast } from 'src/interfaces/bcast';
import { BcastTemplateFormValidator } from './bcast-template-form-validator';
import { IonInput } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { BCAST_MAIN_IMAGE_NAME } from 'src/constants';

@Component({
  selector: 'app-bcast-template',
  templateUrl: './bcast-template.component.html',
  styleUrls: ['./bcast-template.component.scss'],
})
export class BcastTemplateComponent  implements OnInit {

  @Output() saveBcast: EventEmitter<Partial<IBcast>> = new EventEmitter();
  formValidator: BcastTemplateFormValidator;

  constructor() { }

  ngOnInit() {
    this.formValidator = new BcastTemplateFormValidator();
  }

  async takePicture() {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    const blob = await fetch(photo.webPath).then(_ => _.blob());
    const imageName = `${BCAST_MAIN_IMAGE_NAME}.${photo.format}`;
    const image = new File([blob], imageName, { type: blob.type });
    this.formValidator.setImage(image, photo.webPath);
  };

  async save() {
    try {
      const formValue = this.formValidator.formGroup.value;
      const { latitude: lat, longitude: lng } = await Geolocation.getCurrentPosition()?.then(_ => _.coords);
      const bcast: Partial<IBcast> = {
        image: formValue.image,
        content: formValue.content,
        title: formValue.title,
        expiresAt: formValue.expiresAt,
        location: { lat, lng },
        tag: formValue.tag,
        maxUsers: formValue.maxUsers
      }
      this.saveBcast.emit(bcast);
    } catch (error) {
      window.alert(error);
    }
  }

  addTag(tagInput: IonInput) {
    const tag = tagInput.value as string;
    tagInput.value = '';
    this.formValidator.addTag(tag);
  }



}
