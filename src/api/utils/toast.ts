import { ToastController } from '@ionic/angular';

const _toastController = new ToastController();

let _toast: HTMLIonToastElement;

const _toastBuilder = (position: 'top' | 'middle' | 'bottom', duration: number) => {
    return (color: 'success' | 'warning' | 'danger') => {
        return async (message: string) => {
            _toast = await
                _toastController.create({
                    message,
                    duration,
                    position,
                    color
                })
            _toast.present();
        }
    }
}

const toastBuilder = _toastBuilder('bottom', 3000);

const success = toastBuilder('success');
const warning = toastBuilder('warning');
const danger = toastBuilder('danger');

export const toast = {
    success,
    warning,
    danger
}

