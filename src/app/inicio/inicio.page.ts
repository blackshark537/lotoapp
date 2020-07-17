import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Draw, AdminDraw } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';
import * as adminAction from '../actions/admin_draw.action';
import * as userAction from '../actions/user.actions';
import { UserModel } from '../models/user.model';
import { NativeHelpersService } from '../services/native-helpers.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  dateNow=new Date(Date.now());
  draw_type: string;
  draw: AdminDraw = null;
  price = 15;
  numbers_draws: number[] = [];

  draws$: Observable<AdminDraw[]>
  user: UserModel;
  filter: string = null;
  loteriesFilters: any[] = [];

  user_draw: Draw ={
    Data: [],
    draw: null,
    favorite: false,
    lottery: null,
    ballsqty: null,
    owner: null
  };

  lotteryModel = [
    {
      lottery: 'Leidsa',
      img: 'assets/leidsa.png'
    },
    {
      lottery: 'Nacional',
      img: 'assets/loteria-nacional.png'
    },
    {
      lottery: 'Real',
      img: 'assets/loteria-real.png'
    },
    {
      lottery: 'Loteka',
      img: 'assets/loteka.png'
    }
  ];

  constructor(
    private native: NativeHelpersService,
    private store: Store<StoreModel>
  ) { }

  ngOnInit() {
    this.draws$ = this.store.select('admin_draw');
    this.store.select('user_state').subscribe(resp =>{
      this.user = {...resp};
    });

    this.store.dispatch(adminAction.GET());
    this.store.dispatch(userAction.GET());
  }

  get material(): boolean{
    return this.native.matdesign;
  }

  filterLoteries(){
    this.loteriesFilters=[];
    this.draws$.subscribe(resp =>{
      this.loteriesFilters = resp.filter((val)=> val.lottery === this.filter);
    });
  }

  date(expiryDate){
    return new Date(expiryDate);
  }

  userDraw(){
    if(this.draw != null){
      this.user_draw.lottery = this.draw.lottery;
      this.user_draw.draw = this.draw.draw;
      this.user_draw.img = this.draw.img;
      this.user_draw.expiryDate = this.draw.expiryDate;
      this.user_draw.ballsqty = this.draw.ballsqty;
      this.user_draw.Data = [];
    }
  }

  async openNormal(draw){
    this.draw = draw;
    this.userDraw();
    this.numbers_draws = [];
    this.price = 5 * this.draw.ballsqty;
    this.draw_type = 'Sorteo Platinum';
    
    if(await this.ask()){
      this.user.credits -= this.price
      try{
        await this.normal_draw(0);
        //await this.openModal();
        console.log(this.numbers_draws, draw);
      } catch(error){
        if(error){
          await this.errorAlert( error);
        } else {
          await this.errorAlert('Demasiados números repetidos\n');
        }
      }
    }
  }

  async openRandom(draw){
    this.draw = draw;
    this.userDraw();
    this.numbers_draws = [];
    this.price = 2 * this.draw.ballsqty;
    this.draw_type = 'Sorteo por la maquina';
    
    if(await this.ask()){
      this.user.credits -= this.price
      try{
        await this.random_draw();
        //this.openModal();
      } catch(error){
        this.errorAlert(error);
      }
    }
  }

  async ask(): Promise<boolean>{
    const msg = `se descontaran  $${this.price}.00 creditos, aceptar para continuar!`;
    return await this.native.comfirmModal(msg);
  }

  async normal_draw(index: number){
    if(this.numbers_draws.length === this.draw.ballsqty) return 0;
    let num = await this.pick_one(this.draw.Games[0].Data[index]);
    let exist = await this.exist(num);
    if(!exist && num != null){
      this.numbers_draws.push(num);
      this.normal_draw(index++);
    } else {
      this.normal_draw(index);
    }
  }

  async random_draw(){
    if(this.numbers_draws.length === this.draw.ballsqty) return 0;
    let num = await this.pick_random();
    let exist = await this.exist(num);
    if(!exist) this.numbers_draws.push(num);
    this.random_draw();
  }

  async pick_one(list: any[]) {
    let i = Math.floor(Math.random() * list.length);
    return list[i];
  }

  async pick_random() {
    if(this.numbers_draws.length <= 5){
      return Math.floor(Math.random() * this.draw.max_values) +1
    } else {
      return Math.floor(Math.random() * 14) +1
    }
  }

  async exist(num: number){
    let confirm = false;
    await this.numbers_draws.map(val =>{
      if(val === num) confirm = true;
    });
    return confirm;
  }

  async errorAlert(msg: string) {
    await this.native.showError(msg);
  }

}
