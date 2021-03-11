import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel } from '../models/store.model';
import { GET_All_Users, DELETE_USER } from '../actions/user.actions';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { NativeHelpersService } from '../services/native-helpers.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  user$: Observable<UserModel[]>;

  constructor(
    private native: NativeHelpersService,
    private store: Store<StoreModel>,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    this.user$ = this.store.select('users_profiles');

    this.store.dispatch(GET_All_Users());
  }

  async deleteOne(user){
    if(user.role === 'Admin') return
    const answer = await this.native.comfirmModal('Estas seguro que deseas eliminar este usuario?', 'Alerta!!!')
    if(answer) this.store.dispatch(DELETE_USER({user}));
  }

  async modal(user: UserModel){
    const m = await this.modalCtrl.create({
      animated: true,
      swipeToClose: true,
      component: ModalComponent,
      cssClass: 'fullscreen',
      componentProps: {
        user: {...user}
      }
    });

    await m.present();
    await m.onWillDismiss();
    this.store.dispatch(GET_All_Users());
  }

}
