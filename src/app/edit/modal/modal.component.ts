import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input('data') data: number[];
  @Input('head') head: string;

  choosed: number[] = [];
  data2: number[] = [];

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    
  }

  pushOne(num, index){
    this.choosed.push(num);
    this.data.splice(index, 1);
  }

  popOne(num, index){
    this.data.push(num);
    this.choosed.splice(index, 1);
  }

  save(){
    this.data2 = this.choosed;
    this.dismiss();
  }

  async dismiss(){
    await this.modalCtrl.dismiss({
      choosed: this.data2
    });
  }

}
