import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminGuard } from '../guards/admin.guard';
import { PublishFormComponent } from './publish-form/publish-form.component';


@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit, OnDestroy {
  
  filter: string = null;
  colors = ['danger', 'success', 'warning', 'primary']
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
    public adminGuard: AdminGuard,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

  ngOnDestroy(){
    
  }

  async openForm(){
    const modal = await this.modalCtrl.create({
      component: PublishFormComponent,
      componentProps:{
        lottery: ''
      }
    });

    await modal.present();
  }
}
