import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent {

  @Output() croppedBase64 = new EventEmitter<string>(null);
  @Input() imageUrl: string;
  @ViewChild(IonModal) modal: IonModal;

  cropper: Cropper;

  constructor() { }

  ngOnChanges(changes) {
    if (changes?.imageUrl?.currentValue) {
      setTimeout(async () => {
        await this.modal.present();
        const htmlImage = document.getElementById('imageRef') as HTMLImageElement;
        this.initCrop(htmlImage);
      })
    }
  }

  initCrop(htmlImage: HTMLImageElement) {
    if (this.cropper) {
      this.cropper.destroy();
    }

    this.cropper = new Cropper(htmlImage, {
      aspectRatio: 4 / 3,
      crop(event) {
        // console.log(event)
      }
    });
  }

  getCroppedBase64Image() {
    return new Promise<string>((resolve, reject) => {
      if (!this.cropper) {
        reject("Cropper not initialized!");
      }
  
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
  
        reader.readAsDataURL(blob);
      });
    });
  }

  
  confirmCrop() {
    this.getCroppedBase64Image().then(croppedBase64 => {
      this.croppedBase64.emit(croppedBase64);
      this.modal.dismiss();
    }).catch(error => {
      console.error("Error getting cropped image:", error);
    });
  }

  cancel() {
    this.modal.dismiss();
  }


}
