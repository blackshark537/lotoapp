import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { PlayComponent } from './play/play.component';
import { CustomGameComponent } from './custom-game/custom-game.component';
import { StoreModel } from 'src/app/models/store.model';
import { Store } from '@ngrx/store';
import { Draw, AdminDraw } from '../models/draw.model';
import { ARCHIVE_DRAW, UPDATE } from '../actions/user.actions';
import { UserModel } from '../models/user.model';
import { NativeHelpersService } from '../services/native-helpers.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  user: UserModel;
  draw_type: string;
  draw: AdminDraw = null;
  price = 15;
  initialCredit = 0;
  numbers_draws: number[] = [];
  id: string=null;
  header: string[]=[];
  user_draw: Draw ={
    Data: [],
    draw: null,
    favorite: false,
    lottery: null,
    ballsqty: null,
    owner: null
  };
  Data = [];

  constructor(
    private store: Store<StoreModel>,
    private activeRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private native: NativeHelpersService,
    private router: Router,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.draw_type = '';
    this.store.select('admin_draw').subscribe(resp =>{
      let d = resp.filter(val => val.draw === this.id)
      this.draw = {...d[0]};
    });

    this.store.select('user_state').subscribe(resp=>{
      this.user = {...resp};
      //console.log(this.user);
      this.initialCredit = this.user.credits;
    });

    if(this.draw != null){
      this.user_draw.lottery = this.draw.lottery;
      this.user_draw.draw = this.draw.draw;
      this.user_draw.img = this.draw.img;
      this.user_draw.expiryDate = this.draw.expiryDate;
      this.user_draw.ballsqty = this.draw.ballsqty;
      this.user_draw.Data = [];
    }

    let headers = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.MAS', 'S.L.MAS'];
    headers.map((head, i)=>{
      if(i < this.draw.ballsqty) this.header.push(head);
    });

  }

  async ngOnDestroy(){
    if(this.user_draw.Data.length > 0){
      await this.back();
    }
  }

  goInicio(){
    this.router.navigate(['/inicio']);
  }

  async back(){
    const result = await this.native.comfirmModal('Deseas guardar la partida!!!');
    if(result){
      this.save_draw();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async save_draw(){
    this.user_draw.emitDate = new Date(Date.now());
    this.user_draw.owner = this.user.email;

    await this.store.dispatch(ARCHIVE_DRAW({draw: this.user_draw}));
    await this.native.showLoading();
    //console.log('usr => ',this.user);
    this.user.credits -= this.debit;
    await this.store.dispatch(UPDATE({user: this.user}));
    this.router.navigate(['/inicio']);
  }

  matdesign(): boolean{
    return this.native.matdesign;
  }

  async openAction(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Modos de Juego',
      buttons:[
        {
          icon: 'cash',
          text: 'Sorteo Platinum $5.00 RD X bola',
          handler: ()=>{this.openNormal()}
        },
        {
          icon: 'construct',
          text: 'Sorteo Gold $10.00 RD X bola',
          handler: ()=>{this.openCustom()}
        },
        {
          icon: 'shuffle',
          text: 'Sorteo por la maquina $2.00 RD X bola',
          role: 'destructive',
          handler: ()=>{this.openRandom()}
        },
        {
          icon: 'close',
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openNormal(){
    this.numbers_draws = [];
    this.price = 5 * this.draw.ballsqty;
    this.draw_type = 'Sorteo Platinum';
    
    if(await this.ask()){
      this.user.credits -= this.price
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
  }

  async openCustom(){
    this.numbers_draws = [];
    this.price = 10 * this.draw.ballsqty;
    this.draw_type = 'Sorteo Gold';
    
    if(await this.ask()){
      this.user.credits -= this.price
      try{
        await this.custom_draw(0);
        await this.openModal();
      } catch(error){
        if(error){
          await this.errorAlert( error);
        } else {
          await this.errorAlert('Demasiados números repetidos\n');
        }
      }
    }
  }

  async openRandom(){
    this.numbers_draws = [];
    this.price = 2 * this.draw.ballsqty;
    this.draw_type = 'Sorteo por la maquina';
    
    if(await this.ask()){
      this.user.credits -= this.price
      try{
        await this.random_draw();
        this.openModal();
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
    if(!exist){
      this.numbers_draws.push(num);
      this.normal_draw(index++);
    } else {
      this.normal_draw(index);
    }
  }

  async custom_draw(index: number){
    if(this.numbers_draws.length === this.draw.ballsqty) return 0;
    let num = await this.pick_one(this.draw.Games[1].Data[index]);
    let exist = await this.exist(num);
    if(!exist){
      this.numbers_draws.push(num);
      this.custom_draw(index+=1);
    } else {
      this.custom_draw(index);
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
    return list[Math.floor(Math.random() * list.length)];
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
    };
 
  }

  //not in use
  async openCustomGameModal(){
    const modal = await this.modalCtrl.create({
      component: CustomGameComponent,
      swipeToClose: true,
      animated: true,
      backdropDismiss: false,
      componentProps:{
        draw: this.draw
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.data.length > 0 ){
       this.Data = data.data;
    }
  }

  get debit(){
    let debt=0;
    this.user_draw.Data.map((val, i)=>{
      debt+= val[this.user_draw.ballsqty+1];
    })
    return debt;
  }

  async errorAlert(msg: string) {
    await this.native.showError(msg);
  }
}
