import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loadingCtrl: LoadingController) { 
    this.buildLoader()
  }

  async buildLoader() {
    this._loader = await this.loadingCtrl.create({
      spinner: 'lines-sharp'
    });
  }

  private _loader: HTMLIonLoadingElement;

  public show() { this._loader.present() };

  public hide() { this._loader.dismiss() };


}
