import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UpdateUserInterface, UserAccounting, UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { StoreModel } from 'src/app/models/store.model';
import * as UserActions from '../../actions/user.actions';
import { NativeHelpersService } from 'src/app/services/native-helpers.service';
import { ModalController } from '@ionic/angular';
import { UserhttpService } from 'src/app/services/userhttp.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input('user') user: UserModel;
  userPreference: UpdateUserInterface ={
    email: null,
    active: false,
    credits: 0,
    importe: 0
  }

  hasChanged = false;
  accountingInfo: UserAccounting[] = [];

  constructor(
    private modalCtrl: ModalController,
    private native: NativeHelpersService,
    private store: Store<StoreModel>,
    private httpService: UserhttpService
  ) { }

  ngOnInit() {
    this.userPreference = {
      email: this.user.email,
      active: this.user.active,
      credits: this.user.credits,
      importe: 0
    }

    this.httpService.getAccountInfo(this.user.email).subscribe(resp => {
      this.accountingInfo = resp;
    });
  }

  async save(){
    await this.store.dispatch(UserActions.UpdateCredits({userPreferences: this.userPreference}));
    await this.native.showLoading();
    this.hasChanged = false;
  }

  detectChange(){
    this.hasChanged = true;
  }

  async dismiss(){
    if(this.hasChanged){
      const resp = confirm('Se perderan los cambios realizados, Esta seguro que quiere salir?')
      if(resp) await this.modalCtrl.dismiss();
    } else {
      await this.modalCtrl.dismiss();
    }
  }

}
