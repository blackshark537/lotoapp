import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Draw } from 'src/app/models/draw.model';

@Component({
  selector: 'app-custom-game',
  templateUrl: './custom-game.component.html',
  styleUrls: ['./custom-game.component.scss'],
})
export class CustomGameComponent implements OnInit {

  @Input('draw') draw: Draw;
  user_draw: Draw;
  header;
  index_selected: number;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.header = ['primero', 'segundo', 'tercero', 'quarto', 'quinto', 'sexto', 'L.Mas', 'S.L.Mas']
    this.index_selected = 0;
    this.user_draw = {...this.draw};
    this.user_draw.Data = [];
  }

  setNumbers(event: string[]){
    console.log(event);
    this.user_draw.Data[this.index_selected] = event
  }

  setIndex(event){
    this.index_selected = parseInt(event);
  }

  async dismiss() {
    await this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
