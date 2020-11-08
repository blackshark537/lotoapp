import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreModel } from 'src/app/models/store.model';
import { Store } from '@ngrx/store';
import { Draw } from '../models/draw.model';
import { UserModel } from '../models/user.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  user: UserModel;
  price = 15;
  initialCredit = 0;
  user_draws: Draw[] = [];

  constructor(
    private modalCtrl: ModalController,
    private store: Store<StoreModel>
  ) { }

  async ngOnInit() {
    await this.store.select('draw_state').subscribe(resp =>{
      this.user_draws = [...resp];
    });
  }

  async dismiss(){
    await this.modalCtrl.dismiss();
  }

  headers(draw: Draw){
    let headers = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.MAS', 'S.L.MAS'];
    headers.splice(draw.ballsqty, headers.length-draw.ballsqty)
    return headers;
  }

  async ngOnDestroy(){

  }
}
