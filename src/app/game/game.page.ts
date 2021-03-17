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

  @Input('lottery') draw: string;
  @Input('lottery') lottery: string;

  user: UserModel;
  price = 15;
  initialCredit = 0;
  user_draws: Draw[] = [];

  public entry = [
    { val: 'Sorteo Platinum', isChecked: true },
    { val: 'Sorteo Gold', isChecked: false },
    { val: 'Sorteo por la maquina', isChecked: false }
  ];

  constructor(
    private modalCtrl: ModalController,
    private store: Store<StoreModel>
  ) { }

  async ngOnInit() {

    this.store.select('draw_state').subscribe(resp =>{
      this.user_draws = [...resp].filter(val => val.draw == this.draw);
    });
    this.store.dispatch(userAction.GET_TODAY_DRAWS());
  }

  activeCheck(indx){
    this.entry.forEach(check => {
      if(check.val != this.entry[indx].val) check.isChecked = false;
    });
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
