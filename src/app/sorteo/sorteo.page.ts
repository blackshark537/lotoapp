import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { FormComponent } from './components/form/form.component';
import { Store } from '@ngrx/store';
import { GET, DEL } from 'src/app/actions/admin_draw.action';
import { Draw } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sorteo',
  templateUrl: './sorteo.page.html',
  styleUrls: ['./sorteo.page.scss'],
})
export class SorteoPage implements OnInit {

  selectedIndex: number
  draws: Observable<Draw[]>;
  draw: Draw;
  edit: boolean;

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private actionController: ActionSheetController,
    private modalController: ModalController,
    private store: Store<StoreModel>
  ) { }


  ngOnInit() {
    this.edit= false;
    this.draws = this.store.select('admin_draw');
    this.store.dispatch(GET());
  }

  matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  async openActions(index: number, draw: Draw){
    
    this.selectedIndex = index;
    this.draw = draw;

    const actionSheet = await this.actionController.create({
      header: 'Acciones',
      buttons:[
        {
          text: 'editar',
          icon: 'pencil',
          handler: () =>{ this.edit=true; this.openModal() }
        },
        {
          text: 'reciclar',
          icon: 'trash',
          cssClass: 'delete',
          role: 'destructive',
          handler: ()=>{ this.del_one(this.selectedIndex) }
        },
        {
          text: 'cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: FormComponent,
      swipeToClose: true,
      keyboardClose: true,
      componentProps: {
        edit: this.edit,
        index: this.selectedIndex,
        draw: this.draw
      }
    });

    await modal.present();
  }

  new_one(){
    this.edit = false;
    this.openModal();
  }

  update_one(){
    console.log('update', this.draw);
    
  }

  async del_one(index: number){
    await this.store.dispatch(DEL({index}));
    const toast = await this.toastCtrl.create({
      message: 'Enviado a la papelera de reciclaje',
      duration: 4000
    });

    await toast.present();
  }
}
