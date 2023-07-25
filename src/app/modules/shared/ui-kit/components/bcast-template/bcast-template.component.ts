import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IBcast } from 'src/interfaces/bcast';
import { FormValidator } from 'src/models/form-validator';
import { v4 as uuid } from "uuid";
import { BcastTemplateFormValidator } from './bcast-template-form-validator';

@Component({
  selector: 'app-bcast-template',
  templateUrl: './bcast-template.component.html',
  styleUrls: ['./bcast-template.component.scss'],
})
export class BcastTemplateComponent  implements OnInit {

  @Output() bcast: EventEmitter<Partial<IBcast>> = new EventEmitter(null);

  imageSrc: string;
  imageFile: File;
  formValidator: FormValidator;

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
    this.imageFile = new File([blob], `${uuid()}.${image.format}`, { type: blob.type });
    this.imageSrc = image.webPath;
  
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  };

  save() {
    //Camera.
  }



}
