import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
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
  private alertSound = new Audio();
  public folder: string;
  public detail: boolean;
  public draw: Draw;
  public indexSelected: number;
  public dateNow = new Date(Date.now());
  public dateExp;
  public user: UserModel = {
    archived: [],
    recycle: [],
    name: '',
    password: ''
  };
  
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController,
    private platform: Platform,
    private store: Store<StoreModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  //check if the platform is Android
  get matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.select('user_state').subscribe(state=>{
      this.user = {...state};
      this.user.archived = [...state.archived];
      this.user.recycle = [...state.recycle];
    });
  }

  // one click to select a folder OR double click to open the selected folder
  async openFolder(index: number){
    if(this.indexSelected === index){
      this.router.navigate(['/file', index]);
    }else{
      this.indexSelected = index;
    }
  }
  
  //open the actionSheet
  async openActions(index?: number){
    const options = this.isRecycle? this.recicleOptions(index) : this.normalOptions(this.indexSelected);
    const actionSheet = await this.actionCtrl.create(options);
    await actionSheet.present();
  }

  //check if the page is the recycle page
  get isRecycle(){
    return this.folder === 'Reciclaje'? true : false;
  }

  //Restore data from recycle bin
  async restore(index){
    if(this.user.recycle[index].owner === 'user') await this.store.dispatch(ARCHIVE_DRAW({draw: this.user.recycle[index]}));
    if(this.user.recycle[index].owner === 'admin') await this.store.dispatch(SAVE(this.user.recycle[index]));
    await this.store.dispatch(DELETE_ONE({index})); 
  }

  normalOptions(index){
    let opt = {
      header: 'Acciones',
      translucent: true,
      buttons:[
        {
          text: 'Abrir',
          icon: 'open',
          handler: () =>{ 
            this.openFolder(this.indexSelected)
          }
        },
        {
          text: 'Favorito',
          icon: 'heart',
          handler: () =>{ 
            this.store.dispatch(MARK_AS_FAVORITE({index}));
            this.folder === 'Archivadas'? this.showToast('Enviado a favoritas!') :
            this.showToast('Enviado a archivadas!');
          }
        },
        {
          text: 'Reciclar',
          icon: 'trash',
          cssClass: 'delete',
          role: 'destructive',
          handler: ()=>{ 
            this.store.dispatch(RECICLE({index}));
            this.showToast('Enviado a la papelera de reciclaje!');
          }
        },
        {
          text: 'cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    };
    if(this.folder != 'Archivadas') opt.buttons[1].icon='heart-dislike';
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
            this.showToast('Objeto resturado!');
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
      animated: true,
      backdropDismiss: false,
      translucent: true,
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
                this.showToast('Objetos eliminados!');
              } else {
                this.store.dispatch(DELETE_ONE({index}));
                this.showToast('Objeto eliminado!');
              }
           }
        },
      ]
    });

    alert.present().then(()=>{
      this.alertSound.src = 'assets/notify.mp3'
      this.alertSound.volume = 1;
      this.alertSound.onloadeddata  = ()=>{
        this.alertSound.play();
      }
    });
  }

  async showToast(msg: string){
    const toast = await this.toastCtrl.create({
      position: 'top',
      buttons:[
        {
          icon: 'close',
          side: 'end',
          role: 'cancel'
        }
      ],
      message: msg,
      animated: true,
      translucent: true,
      duration: 4000
    });

    this.matdesign? toast.position = 'bottom' : toast.position = 'top';
    await toast.present();
  }
}
