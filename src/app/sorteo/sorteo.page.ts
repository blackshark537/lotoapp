import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { FormComponent } from './components/form/form.component';
import { Store } from '@ngrx/store';
import { GET, DEL } from 'src/app/actions/admin_draw.action';
import { ADMIN_RECICLE } from 'src/app/actions/user.actions';
import { Draw, AdminDraw } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sorteo',
  templateUrl: './sorteo.page.html',
  styleUrls: ['./sorteo.page.scss'],
})
export class SorteoPage implements OnInit {

  selectedIndex: number
  draw$: Observable<AdminDraw[]>;
  draw: Draw;
  edit: boolean;
  currDate = new Date(Date.now());

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private actionController: ActionSheetController,
    private modalController: ModalController,
    private store: Store<StoreModel>
  ) { }


  ngOnInit() {
    this.edit= false;
    this.draw$ = this.store.select('admin_draw');
    this.store.dispatch(GET());
  }

  get matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  expDate(date){
    return new Date(date);
  }

  async openActions(index: number, draw: Draw){
    
    this.selectedIndex = index;
    this.draw = draw;

    const actionSheet = await this.actionController.create({
      header: 'Acciones',
      translucent: true,
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
          handler: ()=>{ this.del_one() }
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
        Draw: {...this.draw}
      }
    });

    await modal.present();
  }

  new_one(){
    this.edit = false;
    this.openModal();
  }

  async del_one(){
    await this.store.dispatch(ADMIN_RECICLE({draw: this.draw}));
    await this.store.dispatch(DEL({index: this.selectedIndex}));
    const toast = await this.toastCtrl.create({
      message: 'Enviado a la papelera de reciclaje!',
      position: 'top',
      buttons:[
        {
          icon: 'close',
          side: 'end',
          role: 'cancel'
        }
      ],
      animated: true,
      translucent: true,
      duration: 4000
    });
    this.matdesign? toast.position = 'bottom' : toast.position = 'top';
    await toast.present();
  }
}
