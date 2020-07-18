import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Draw, AdminDraw } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';
import * as adminAction from '../actions/admin_draw.action';
import * as userAction from '../actions/user.actions';
import { UserModel } from '../models/user.model';
import { NativeHelpersService } from '../services/native-helpers.service';
import { PlayComponent } from '../game/play/play.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  game: number = 0;

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
    private router: Router,
    private modalCtrl: ModalController,
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

  async save_draw(){
    this.user_draw.emitDate = new Date(Date.now());
    this.user_draw.owner = this.user.email;
    
    await this.store.dispatch(userAction.ARCHIVE_DRAW({draw: this.user_draw}));
    await this.native.showLoading();
    await this.updateUser();
    this.router.navigate(['/folder/Archivadas']);
  }

  async updateUser(){
    await this.store.dispatch(userAction.UPDATE({user: this.user}));
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

  async buyCredits(){
    await this.notify('Para recargar deposite a esta cuenta: null');
  }

  async openNormal(draw, game){
    this.draw = draw;
    this.game = game;
    this.game? this.draw_type = 'Sorteo Gold' : this.draw_type = 'Sorteo Platinum';
    this.game? this.price = 3 * this.draw.ballsqty : this.price = 5 * this.draw.ballsqty;

    this.userDraw();
    this.numbers_draws = [];
    if(this.user.credits> this.price){
      if(await this.ask()){
        this.user.credits -= this.price
        await this.updateUser();
        try{
          await this.normal_draw(0);
          await this.openModal();
        } catch(error){
          if(error){
            await this.errorAlert( error);
          } else {
            await this.errorAlert('Demasiados números repetidos\n');
          }
        }
      }
    } else {
      this.errorAlert('no cuenta con los creditos suficientes, por favor recargue');
    }
  }

  async openRandom(draw){
    this.draw = draw;
    this.userDraw();
    this.numbers_draws = [];
    this.price = 2 * this.draw.ballsqty;
    this.draw_type = 'Sorteo por la maquina';
    if(this.user.credits> this.price){
      if(await this.ask()){
        this.user.credits -= this.price
        await this.updateUser();
        try{
          await this.random_draw();
          this.openModal();
        } catch(error){
          this.errorAlert(error);
        }
      }
    } else {
      this.errorAlert('no cuenta con los creditos suficientes, por favor recargue');
    }
  }

  async ask(): Promise<boolean>{
    const msg = `se descontaran  $${this.price}.00 creditos, aceptar para continuar!`;
    return await this.native.comfirmModal(msg);
  }

  async normal_draw(index: number){

    if(this.numbers_draws.length === this.draw.ballsqty) return 0;
    let num = await this.pick_one(this.draw.Games[this.game].Data[index]);
    let exist = await this.exist(num);

    if(!exist && num != null){
      this.numbers_draws.push(num);
      this.normal_draw(index+=1);
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
    this.numbers_draws.map(val =>{
      if(val === num) confirm = true;
    });
    return confirm;
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: PlayComponent,
      swipeToClose: false,
      backdropDismiss: false,
      componentProps: {
        draw: this.numbers_draws,
        game: this.draw_type
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.data.length >0){
      data.data.push(this.price);
       this.user_draw.Data.push(data.data);
       await this.save_draw()
    };
 
  }

  async errorAlert(msg: string) {
    await this.native.showError(msg);
  }

  async notify(msg: string){
    await this.native.comfirmModal(msg);
  }

}
