import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, Platform } from '@ionic/angular';
import { PlayComponent } from './play/play.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  draw_type: string;

  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.draw_type = '';
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
    console.log('normal');
    this.draw_type = 'normal';
    this.openModal();
  }

  openCustom(){
    console.log('personalizado');
    this.draw_type = 'personalizado';
    this.openModal();
  }

  openRandom(){
    console.log('random');
    this.draw_type = 'random';
    this.openModal();
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: PlayComponent,
      swipeToClose: false,
      componentProps: {
        draw: '',
        game: this.draw_type
      }
    });

    modal.present();
  }
}
