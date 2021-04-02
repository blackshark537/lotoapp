import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, ToastController, Platform, LoadingController } from '@ionic/angular';


const { Storage, Toast, Modals} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NativeHelpersService {
  private errorSound = new Audio();

  constructor(
    private alertCtl: AlertController,
    private toastCtrl: ToastController,
    private platform: Platform,
    private loading: LoadingController
  ) { }

  get matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  get isNative(): boolean{
    return this.platform.is('hybrid')? true : false;
  }

  async storageGet(key: string): Promise<string>{
    return await (await Storage.get({key})).value;
  }

  async storageSet(key: string, value: string){
    await Storage.set({
      key,
      value
    });
  }

  async showToast(text: string, buttons?: any[]){
    const toast = await this.toastCtrl.create({
      message: text,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          side: 'end',
          role: 'cancel'
        }
      ],
      animated: true,
      translucent: true,
      duration: 4000
    });

    if (buttons) toast.buttons = buttons;
    this.matdesign ? toast.position = 'bottom' : toast.position = 'top';
    await toast.present(); 
  }

  async showLoading(){
    let load = await this.loading.create({
      animated: true,
      duration: 2000,
      backdropDismiss: false,
      message: 'Por favor espere...',
      translucent: true
    });
    await load.present();
    await load.onWillDismiss();
  }

  async _loading(){
    return await this.loading.create();
  }
  async _loadingDismiss(){
    return await this.loading.dismiss();
  }
//====================================================================================
  async comfirmModal(msg: string, header?: string): Promise<any>{
    let conf=false;
    const modal = await this.alertCtl.create({
      header: header || 'Confirmar Sorteo!',
      message: msg,
      animated: true,
      backdropDismiss: false,
      translucent: true,
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=> {conf = false}
        },
        {
          text: 'Aceptar',
          handler: ()=>{ conf = true}
        }
      ]
    });
    this.errorSound.src = 'assets/notify.mp3'
    this.errorSound.volume = 1;
    this.errorSound.onloadeddata  = ()=>{
      this.errorSound.play();
    }
    await modal.present();
    await modal.onWillDismiss();
    return conf;
  }
//====================================================================================
  async showError(message: string) {
    const error = await this.alertCtl.create({
      header: 'Error!',
      subHeader: 'Lo sentimos ha ocurrido un error',
      message,
      animated: true,
      backdropDismiss: false,
      translucent: true,
      buttons: [{text: 'Ok', role: 'cancel'}]
    });
    this.errorSound.src = 'assets/error.wav'
    this.errorSound.volume = 1;
    this.errorSound.onloadeddata = () => {
      this.errorSound.play();
    }
    await error.present();
  }

}
