import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StoreModel } from 'src/app/models/store.model';
import { Store } from '@ngrx/store';
import { Draw } from '../models/draw.model';
import { UserModel } from '../models/user.model';
import { ModalController } from '@ionic/angular';
import * as userAction from '../actions/user.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  @Input('lottery') lottery: string;
  user: UserModel;
  price = 15;
  initialCredit = 0;
  user_draws: Draw[] = [];

  public entry = [
    { val: 'Sorteo Platinum', isChecked: false },
    { val: 'Sorteo Gold', isChecked: false },
    { val: 'Sorteo por la maquina', isChecked: true }
  ];

  constructor(
    private modalCtrl: ModalController,
    private store: Store<StoreModel>
  ) { }

  async ngOnInit() {
    console.log(this.lottery)
    this.store.select('draw_state').subscribe(resp =>{
      this.user_draws = [...resp].filter(val => val.lottery == this.lottery);
    });
    this.store.dispatch(userAction.GET_TODAY_DRAWS());
  }

  filter(): string{
    if(this.entry.filter(x => x.isChecked)[0]) return  this.entry.filter(x => x.isChecked)[0].val;
    return null;
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
