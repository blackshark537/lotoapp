import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../models/store.model';
import { MARK_AS_FAVORITE, RECICLE, DELETE_ONE, EMPTY_TRASHCAN, ARCHIVE_DRAW } from '../actions/user.actions';
import { SAVE } from '../actions/admin_draw.action'
import { UserModel } from '../models/user.model';
import { Draw } from '../models/draw.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public detail: boolean;
  public draw: Draw;
  public indexSelected: number;
  public user: UserModel = {
    archived: [],
    recicle: [],
    name: '',
    password: ''
  };
  
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController,
    private platform: Platform,
    private store: Store<StoreModel>,
    private activatedRoute: ActivatedRoute) { }

  matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  ngOnInit() {
    this.detail  = false;
    //this.indexSelected = 0;
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.select('user_state').subscribe(state=>{
      this.user = {...state};
    });
  }

  async openFolder(index: number, draw: Draw){
    this.indexSelected = index;
    this.draw = draw;
    this.detail = true;
  }
  
  async openActions(index: number){
    const options = this.folder === 'Reciclaje'? this.recicleOptions(index) : this.normalOptions(index);
    const actionSheet = await this.actionCtrl.create(options);
    await actionSheet.present();
  }

  async restore(index){
    if(this.user.recicle[index].owner === 'user') await this.store.dispatch(ARCHIVE_DRAW({draw: this.user.recicle[index]}));
    if(this.user.recicle[index].owner === 'admin') await this.store.dispatch(SAVE(this.user.recicle[index]));
    await this.store.dispatch(DELETE_ONE({index})); 
  }

  normalOptions(index){
    let opt = {
      header: 'Acciones',
      translucent: true,
      buttons:[
/*         {
          text: 'cerrar carpeta',
          icon: 'remove-circle',
          handler: ()=> this.detail = false
        }, */
        {
          text: 'favorito',
          icon: 'heart',
          handler: () =>{ 
            this.store.dispatch(MARK_AS_FAVORITE({index}));
            this.detail = !this.detail;
          }
        },
        {
          text: 'reciclar',
          icon: 'trash',
          cssClass: 'delete',
          role: 'destructive',
          handler: ()=>{ 
            this.store.dispatch(RECICLE({index}));
            this.showToast('Enviado a la papelera de reciclaje');
            this.detail = !this.detail;
          }
        },
        {
          text: 'cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    };
    if(this.folder != 'Archivadas') opt.buttons[0].icon='heart-dislike';
    return opt;
  }

  recicleOptions(index){
    return {
      header: 'Acciones',
      translucent: true,
      buttons:[
        {
          text: 'restaurar',
          icon: 'push',
          handler: () =>{
            this.restore(index);
           }
        },
        {
          text: 'eliminar',
          icon: 'close-circle',
          cssClass: 'delete',
          handler: () =>{ this.showAlert(false, index) }
        },
        {
          text: 'vaciar papelera',
          icon: 'trash-bin',
          cssClass: 'delete',
          role: 'destructive',
          handler: ()=>{ this.showAlert(true) }
        },
        {
          text: 'cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    }
  }

  async showAlert(removeAll:boolean, index?: number){
    const alert = await this.alertCtrl.create({
      header: 'Alerta!',
      message: '<strong>Al eliminar estos archivos no se podran recuperar</strong>',
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ok',
          cssClass: 'primary',
          handler: ()=>{ 
              if(removeAll){
                this.store.dispatch(EMPTY_TRASHCAN());
              } else {
                this.store.dispatch(DELETE_ONE({index}));
              }
           }
        },
      ]
    });

    await alert.present();
  }

  async showToast(msg: string){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000
    });

    await toast.present();
  }
}
