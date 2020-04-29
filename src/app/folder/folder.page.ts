import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, ActionSheetController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../models/store.model';
import { MARK_AS_FAVORITE, RECICLE, DELETE_ONE, EMPTY_TRASHCAN } from '../actions/user.actions';
import { UserModel } from '../models/user.model';
import { Draw } from '../models/draw.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  user: UserModel = {
    archived: [],
    recicle: [],
    name: '',
    password: ''
  };
  
  constructor(
    private actionCtrl: ActionSheetController,
    private platform: Platform,
    private store: Store<StoreModel>,
    private activatedRoute: ActivatedRoute) { }

  matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.select('user_state').subscribe(state=>{
      this.user = {...state};
    });
  }

  async openActions(index: number, draw: Draw){
    const options = this.folder === 'Reciclaje'? this.recicleOptions(index) : this.normalOptions(index);
    const actionSheet = await this.actionCtrl.create(options);
    await actionSheet.present();
  }

  normalOptions(index){
    let opt = {
      header: 'Acciones',
      buttons:[
        {
          text: 'favorito',
          icon: 'heart',
          handler: () =>{
            this.store.dispatch(MARK_AS_FAVORITE({index}));
           }
        },
        {
          text: 'reciclar',
          icon: 'trash',
          cssClass: 'delete',
          role: 'destructive',
          handler: ()=>{ 
            this.store.dispatch(RECICLE({index}));
          }
        },
        {
          text: 'cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    };
    if(this.folder != 'Archivadas'){
      opt.buttons[0].icon='heart-dislike'
    }
    return opt;
  }

  recicleOptions(index){
    return {
      header: 'Acciones',
      buttons:[
        {
          text: 'restaurar',
          icon: 'push',
          handler: () =>{
            console.log('restaurar !!!');
           }
        },
        {
          text: 'eliminar',
          icon: 'close-circle',
          cssClass: 'delete',
          handler: () =>{
            this.store.dispatch(DELETE_ONE({index}));
           }
        },
        {
          text: 'vaciar papelera',
          icon: 'trash',
          cssClass: 'delete',
          role: 'destructive',
          handler: ()=>{ 
            this.store.dispatch(EMPTY_TRASHCAN());
          }
        },
        {
          text: 'cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    }
  }
}
