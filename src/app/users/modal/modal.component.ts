import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { StoreModel } from 'src/app/models/store.model';
import * as UserActions from '../../actions/user.actions';
import { NativeHelpersService } from 'src/app/services/native-helpers.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input('user') user: UserModel;

  constructor(
    private modalCtrl: ModalController,
    private native: NativeHelpersService,
    private store: Store<StoreModel>
  ) { }

  ngOnInit() {
    console.log(this.user);
  }

  async save(){
    await this.store.dispatch(UserActions.UPDATE({user: this.user}));
    await this.native.showLoading();
    await this.dismiss();
  }

  async dismiss(){
    await this.modalCtrl.dismiss();
  }

}
