import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IBcast } from 'src/interfaces/bcast';
import { v4 as uuid } from "uuid";
import { BcastTemplateFormValidator } from './bcast-template-form-validator';
import { IonInput } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

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
    this.image = new File([blob], `${uuid()}.${image.format}`, { type: blob.type });
    this.imageSrc = image.webPath;
  
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  };

  async save() {
    const location = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = location.coords;
    const bcast: Partial<IBcast> = {
      title: 'Gelato gusto branzino',
      content: 'Alan Ford content',
      expiresAt: new Date(2026, 10, 12),
      image: this.image,
      location: { lat: latitude, lng: longitude },
      maxUsers: 10,
      tag: ['tag1']
    }
    this.saveBcast.emit(bcast);
  }

  addTag(tagInput: IonInput) {
    const tag = tagInput.value as string;
    tagInput.value = '';
    this.formValidator.addTag(tag);
  }



}
