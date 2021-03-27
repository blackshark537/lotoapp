import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    public adminGuard: AdminGuard,
    private modalCtrl: ModalController,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.filter = this._activeRoute.snapshot.paramMap.get('lottery');
  }

  ngOnDestroy(){
    this.modalCtrl.dismiss();
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
