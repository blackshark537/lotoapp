import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Draw } from 'src/app/models/draw.model';
import { Button } from 'protractor';

@Component({
  selector: 'app-custom-game',
  templateUrl: './custom-game.component.html',
  styleUrls: ['./custom-game.component.scss'],
})
export class CustomGameComponent implements OnInit {

  @Input('draw') draw: Draw;
  user_draw: Draw;
  numbersToDraw =[];
  header = [];
  index_selected: number;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    let headers = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.MAS', 'S.L.MAS'];
    headers.map((head, i)=>{
      if(i < this.draw.ballsqty) this.header.push(head);
    });
    this.index_selected = 0;
    this.user_draw = {...this.draw};
    this.user_draw.Data = [];
  }

  setNumbers(event: string[]){
    this.user_draw.Data[this.index_selected] =[];
    event.map((value, i) => {
      this.user_draw.Data[this.index_selected].push(parseInt(value));
    });
  }

  setIndex(event){
    this.index_selected = parseInt(event);
  }

  lestdraw(){
    if(this.user_draw.Data.length === this.user_draw.ballsqty){
       this.numbersToDraw = this.user_draw.Data;
       this.dismiss();
    } else {
      this.errorAlert('Faltan bolas por llenar');
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

  async dismiss() {
    await this.modalCtrl.dismiss({
      'dismissed': true,
      'data': this.numbersToDraw
    });
  }
}
