import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, ActionSheetController, Platform } from '@ionic/angular';
import { PlayComponent } from './play/play.component';
import { CustomGameComponent } from './custom-game/custom-game.component';
import { StoreModel } from 'src/app/models/store.model';
import { Store } from '@ngrx/store';
import { Draw } from '../models/draw.model';
import { ARCHIVE_DRAW } from '../actions/user.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  draw_type: string;
  draw: Draw;
  price = 15;
  numbers_draws: number[] = [];
  index: number=0;
  header: string[]=[];
  user_draw: Draw ={
    Data: [],
    _id: null,
    active: false,
    ballsqty: null,
    draw: null,
    favorite: false,
    lottery: null,
    owner: null
  };
  Data = [];

  constructor(
    private store: Store<StoreModel>,
    private activeRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private platform: Platform,
    private router: Router,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.index = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.draw_type = '';
    this.store.select('admin_draw').subscribe(resp=>{
      let d = [...resp.slice(this.index, this.index+1)]
      this.draw = {...d[0]};
      this.user_draw = {...d[0]};
      this.user_draw.Data = [];
    });
    let headers = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.MAS', 'S.L.MAS'];
    headers.map((head, i)=>{
      if(i < this.draw.ballsqty) this.header.push(head);
    });
  }

  async ngOnDestroy(){

  }

  goInicio(){
    if(this.user_draw.Data.length > 0){
      this.back()
   }else {
    this.router.navigate(['/inicio']);
   }    
  }

  async back(){
    const alert = await this.alertCtrl.create({
      header: 'Mensage!',
      message: '<strong>Deseas guardar esta partida</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/inicio']);
          }
        }, {
          text: 'Ok',
          handler: async () => {
            this.user_draw.emitDate = new Date(Date.now());
            this.user_draw.owner = 'user';
            await this.store.dispatch(ARCHIVE_DRAW({draw: this.user_draw}));
            this.router.navigate(['/inicio']);
          }
        }
      ]
    });

    await alert.present();
  }

  matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  async openAction(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Modos de Juego',
      buttons:[
        {
          icon: 'cash',
          text: 'Sorteo Platinum',
          handler: ()=>{this.openNormal()}
        },
        {
          icon: 'construct',
          text: 'Sorteo Gold',
          handler: ()=>{this.openCustom()}
        },
        {
          icon: 'shuffle',
          text: 'Sorteo por la maquina',
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
    await this.normal_draw(0);
    this.draw_type = 'Sorteo Platinum';
    this.openModal();
  }

  async openCustom(){
    this.numbers_draws = [];
    this.draw_type = 'Sorteo Gold';
    await this.openCustomGameModal();
    try{
      await this.custom_draw(0);
      await this.openModal();
    } catch(error){
      await this.errorAlert('Demasiados numeros repetidos\n' + error);
    }
  }

  async openRandom(){
    this.numbers_draws = [];
    this.draw_type = 'Sorteo por la maquina';
    try{
      await this.random_draw();
    } catch(error){
      this.errorAlert(error);
    }
    this.openModal();
  }

  async normal_draw(index: number){
    if(this.numbers_draws.length === this.draw.ballsqty) return 0;
    let num = await this.pick_one(this.draw.Data[index]);
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
    let num = await this.pick_one(this.Data[index]);
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
      return Math.floor(Math.random() * 34) +1
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
    if(data.data.length >0) this.user_draw.Data.push(data.data);
 
  }

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

  async errorAlert(msg: string){
    const alerta = await this.alertCtrl.create({
      animated: true,
      header: 'Error',
      message: msg,
      translucent: true,
      buttons: [{
        text: "Cancelar",
        role: 'cancel'
      },{
        text: "Ok",
        role: 'cancel'
      }]
    });

    alerta.present();
  }
}
