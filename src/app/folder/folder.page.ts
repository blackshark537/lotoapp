import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../models/store.model';
import { Draw } from '../models/draw.model';
import {  MARK_AS_FAVORITE } from '../actions/user.actions';
import { UserhttpService } from '../services/userhttp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, OnDestroy {
  
  public folder: string;
  public indexSelected: number;
  public archived: Draw[] = [];
  private archivedCp: Draw[] = [];
  private subs: Subscription;

  constructor(
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
    private platform: Platform,
    private store: Store<StoreModel>,
    private userHttp: UserhttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  //check if the platform is Android
  get matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.subs = this.userHttp.getDraws().subscribe(resp => {
      this.archived = resp.body
      this.archivedCp = resp.body.reverse()
    });
  }

  async ngOnDestroy(){
    this.subs.unsubscribe();
  }

  async onSearch(value: string){
    if( value.length > 3){
    this.archived = this.archivedCp.filter(val => val.lottery.toLowerCase().includes(value.toLowerCase())
     || val.draw.toLowerCase().includes(value.toLowerCase())
     || val.emitDate.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.archived = [...this.archivedCp.reverse()];
    }
  }

  // one click to select a folder OR double click to open the selected folder
  async openFolder(index: number){
    if(this.indexSelected === index){
      this.router.navigate(['/file', index]);
      this.userHttp.draw$.next(this.archived[index]);
    }else{
      this.indexSelected = index;
    }
  }
  
  //open the actionSheet
  async openActions(index?: number){
    const options = this.normalOptions(this.indexSelected);
    const actionSheet = await this.actionCtrl.create(options);
    await actionSheet.present();
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
            this.store.dispatch(MARK_AS_FAVORITE({draw: this.archived[index]}));
            this.folder === 'Archivadas'? this.showToast('Enviado a favoritas!') :
            this.showToast('Enviado a archivadas!');
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
