import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Draw, AdminDraw, TipoSorteo } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';
import * as adminAction from '../actions/admin_draw.action';
import * as userAction from '../actions/user.actions';
import { UserModel } from '../models/user.model';
import { NativeHelpersService } from '../services/native-helpers.service';
import { PlayComponent } from './play/play.component';
import { ModalController } from '@ionic/angular';
import { GamePage } from '../game/game.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnDestroy {


  draw_type: string;
  draw: AdminDraw = null;
  price = 15;
  game: number = 0;

  draws$: Observable<AdminDraw[]>
  last_draw: Draw[];
  user: UserModel;
  filter: string = null;
  drawfilter: string = null;
  loteriesFilters: any[] = [];
  lastDrawLoaded: boolean = false;
  colors = ['danger', 'success', 'warning', 'primary']
  user_draw: Draw;

  prices ={
    gold: 2,
    plat: 3,
    rand: 1
  }

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

  private subs: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private native: NativeHelpersService,
    private store: Store<StoreModel>
  ) { }

  ngOnInit() {
    this.draws$ = this.store.select('admin_draw');
    this.subs = this.store.select('user_state').subscribe(resp =>{
      this.user = {...resp};
    });
    this.store.dispatch(adminAction.GET());
    this.store.dispatch(userAction.GET());
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  cleanUserDraw(){
    this.lastDrawLoaded = false;
    this.user_draw = {
      Data: [],
      draw: null,
      favorite: false,
      lottery: null,
      ballsqty: null,
      owner: null
    };
  }


  async openLastDraw(){
    
    const modal = await this.modalCtrl.create({
      animated: true,
      swipeToClose: true,
      component: GamePage,
      componentProps: {
        lottery: this.filter
      },
      id: 'game-modal',
      cssClass: 'fullscreen'
    });

    await modal.present();
  }

  get material(): boolean{
    return this.native.matdesign;
  }

  async save_draw(){
    await this.native.showLoading();
    await this.store.dispatch(userAction.GET());
    await this.native.showLoading();
    await this.openLastDraw();
  }

  async updateUser(){
    await this.store.dispatch(userAction.UPDATE({user: this.user}));
  }

  filterLoteries(){
    this.cleanUserDraw();
    this.loteriesFilters=[];
    this.draws$.subscribe(resp =>{
      this.loteriesFilters = resp.filter((val)=> val.lottery === this.filter);
    });
  }

  userDraw(){
    if(this.draw != null){
      this.user_draw.lottery = this.draw.lottery;
      this.user_draw.draw = this.draw.draw;
      this.user_draw.img = this.draw.img;
      this.user_draw.ballsqty = this.draw.ballsqty;
      this.user_draw.Data = [];
    }
  }

  async buyCredits(){
    await this.notify('Para recargar deposite a esta cuenta: null');
  }

  async openNormal(draw: AdminDraw, game: number){
    this.cleanUserDraw();
    this.draw = draw;
    this.game = game;
    this.draw_type = this.game? TipoSorteo.GOLD : TipoSorteo.PLATINUM;
    this.price = this.game? this.prices.gold : this.prices.plat;
    this.drawfilter = draw.draw;
    this.userDraw();

    if(this.user.credits> this.price){
      if(await this.ask()){
        try{
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

  async openRandom(draw: AdminDraw){
    this.cleanUserDraw();
    this.draw = draw;
    this.game = 2;
    this.drawfilter = draw.draw;
    this.userDraw();

    this.price = this.prices.rand;
    this.draw_type = TipoSorteo.RANDOM;
    if(this.user.credits> this.price){
      if(await this.ask()){
        try{
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

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: PlayComponent,
      swipeToClose: false,
      backdropDismiss: false,
      componentProps: {
        game: this.game,
        drawType: this.draw_type,
        credits: this.user.credits,
        AdminDraw: this.draw 
      }
    });

    await modal.present();
  }

  async errorAlert(msg: string) {
    await this.native.showError(msg);
  }

  async notify(msg: string){
    await this.native.comfirmModal(msg);
  }

}
