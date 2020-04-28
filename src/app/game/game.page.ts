import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController, Platform } from '@ionic/angular';
import { PlayComponent } from './play/play.component';
import { StoreModel } from 'src/app/models/store.model';
import { Store } from '@ngrx/store';
import { Draw } from '../models/draw.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  draw_type: string;
  draw: Draw;
  numbers_draws: number[] = [];
  index: number=0;
  user_data: any[]=[];

  constructor(
    private store: Store<StoreModel>,
    private activeRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private platform: Platform,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.index = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.draw_type = '';
    this.store.select('admin_draw').subscribe(resp=>{
      let d = [...resp.slice(this.index, this.index+1)]
      this.draw = d[0];
    });
    this.normal_draw();
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
          text: 'Normal',
          role: 'destructive',
          handler: ()=>{this.openNormal()}
        },
        {
          icon: 'construct',
          text: 'Personalizado',
          handler: ()=>{this.openCustom()}
        },
        {
          icon: 'shuffle',
          text: 'Aleatorio',
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

  openNormal(){
    this.normal_draw();
    this.draw_type = 'normal';
    this.openModal();
  }

  openCustom(){
    this.normal_draw();
    this.draw_type = 'personalizado';
    this.openModal();
  }

  openRandom(){
    this.random_draw();
    this.draw_type = 'random';
    this.openModal();
  }

  async normal_draw(){
    this.numbers_draws = [];
    this.draw.Data.map((col: number[]) =>{
      this.numbers_draws.push(col[Math.floor(Math.random() * col.length)]);
    });
  }

  async random_draw(){
    this.numbers_draws = [];
    while (this.numbers_draws.length < 8) {
      if(this.numbers_draws.length < 6) this.numbers_draws.push(Math.floor(Math.random() * 34) +1 );
      if(this.numbers_draws.length < 8) this.numbers_draws.push(Math.floor(Math.random() * 14) +1 );
    }
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: PlayComponent,
      swipeToClose: false,
      componentProps: {
        draw: this.numbers_draws,
        game: this.draw_type
      }
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.data.length >0) this.user_data.push(data.data);
    console.log(this.user_data);
    
  }
}
