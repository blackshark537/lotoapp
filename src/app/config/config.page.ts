import { Component, OnInit } from '@angular/core';
import { NativeHelpersService } from '../services/native-helpers.service';
import { Store } from '@ngrx/store';
import { StoreModel } from '../models/store.model';
import { UserModel } from '../models/user.model';
import * as userAction from '../actions/user.actions';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  user: UserModel;

  constructor(
    private native: NativeHelpersService,
    private store: Store<StoreModel>,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.store.select('user_state').subscribe(resp =>{
      this.user = {...resp};
    });

    this.store.dispatch(userAction.GET());
  }

  //check if the platform is Android
  get matdesign(): boolean{
    return this.native.matdesign;
  }

  async phoneForm(){
    const alert = await this.alertCtrl.create({
      animated: true,
      translucent: true,
      header: 'Telefono',
      inputs: [
        {
          label: 'Telefono',
          placeholder: 'Telefono',
          name: 'phone',
          type: 'tel'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
    const { data, role} = await alert.onWillDismiss();
    if(data.values) this.user.phone = data.values.phone;
  }
}
