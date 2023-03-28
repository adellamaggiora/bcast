import { LoadingController } from '@ionic/angular';

const _loadingCtrl = new LoadingController();

let _loader: HTMLIonLoadingElement;

const _loaderBuilder = async () => {
    _loader = await _loadingCtrl.create({
        spinner: 'lines-sharp'
    });
}

_loaderBuilder();

const show = () => { _loader.present() };

const hide = () => { _loader.dismiss() };

const isVisible = () =>  window.structuredClone(_loader);


export const loader = {
    show,
    hide,
    isVisible
}


