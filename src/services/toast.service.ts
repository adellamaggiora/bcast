import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  private _toastBuilder(position: 'top' | 'middle' | 'bottom', duration: number) {
    return (color: 'success' | 'warning' | 'danger') => {
      return async (message: string) => {
        const toast = await this.toastController.create({
          message,
          duration,
          position,
          color
        });
        await toast.present();
      }
    }
  }

  private _showToast = this._toastBuilder("bottom", 3000);

  public success = this._showToast('success');
  public warning = this._showToast('warning');
  public danger = this._showToast('danger');

}
