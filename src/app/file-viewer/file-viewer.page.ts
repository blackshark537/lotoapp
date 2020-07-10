import { Component, OnInit } from '@angular/core';
import { Draw } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MARK_AS_FAVORITE, RECICLE } from '../actions/user.actions';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.page.html',
  styleUrls: ['./file-viewer.page.scss'],
})
export class FileViewerPage implements OnInit {

  draw: Draw;
  index: number;
  header: string[] = [];
  public dateNow = new Date(Date.now());
  public dateExp;

  constructor(
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
    private store: Store<StoreModel>,
    private activeRoute: ActivatedRoute,
    private platform: Platform,
    private router: Router
  ) { }

  async ngOnInit() {
    this.index = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    
    await this.store.select('user_state').subscribe(resp=>{
      let d = {...resp}
      this.draw = d.archived[this.index];
    });

    let headers = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.MAS', 'S.L.MAS'];
    headers.map((head, i)=>{
      if(i < this.draw.ballsqty) this.header.push(head);
    });
    this.dateExp = this.draw.expiryDate;
  }

  //check if the platform is Android
  get matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  async openActions(){
    const actionSheet = await this.actionCtrl.create(this.normalOptions(this.index));
    await actionSheet.present();
  }

  normalOptions(index){
    let opt = {
      header: 'Acciones',
      translucent: true,
      buttons:[
        {
          text: 'favorito',
          icon: 'heart',
          handler: () =>{ 
            this.store.dispatch(MARK_AS_FAVORITE({draw: this.draw}));
            this.router.navigate(['folder', 'Archivadas']);
          }
        },
/*         {
          text: 'reciclar',
          icon: 'trash',
          cssClass: 'delete',
          role: 'destructive',
          handler: ()=>{ 
            this.store.dispatch(RECICLE({index}));
            this.showToast('Enviado a la papelera de reciclaje');
            this.router.navigate(['folder', 'Archivadas']);
          }
        }, */
        {
          text: 'cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    };

    if(this.draw.favorite) opt.buttons[0].icon='heart-dislike'
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
