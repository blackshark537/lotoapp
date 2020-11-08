import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel } from '../models/store.model';
import { GET_All_Users } from '../actions/user.actions';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { NativeHelpersService } from '../services/native-helpers.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  user$: Observable<UserModel[]>;

  constructor(
    private store: Store<StoreModel>,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    this.user$ = this.store.select('users_profiles');

    this.store.dispatch(GET_All_Users());
  }

  async modal(user: UserModel){
    const m = await this.modalCtrl.create({
      animated: true,
      swipeToClose: true,
      component: ModalComponent,
      componentProps: {
        user: {...user}
      }
    });

    await m.present();
    await m.onWillDismiss();
    this.store.dispatch(GET_All_Users());
  }

}
