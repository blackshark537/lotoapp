import { Component, OnDestroy, OnInit } from '@angular/core';
import { Draw } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MARK_AS_FAVORITE, RECICLE } from '../actions/user.actions';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { UserhttpService } from '../services/userhttp.service';
import { Subscription } from 'rxjs';
import { AdminhttpService } from '../services/adminhttp.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.page.html',
  styleUrls: ['./file-viewer.page.scss'],
})
export class FileViewerPage implements OnInit, OnDestroy {

  draw: Draw;
  wondraw = [];
  index: number;
  private subs: Subscription[] = [];
  

  constructor(
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
    private store: Store<StoreModel>,
    private userHttp: UserhttpService,
    private adminHttp: AdminhttpService,
    private activeRoute: ActivatedRoute,
    private platform: Platform,
    private router: Router
  ) { }

  async ngOnInit() {
    this.index = parseInt(this.activeRoute.snapshot.paramMap.get('id'));

    this.subs.push(this.userHttp.draw$.subscribe(draw =>{
      if(draw)this.draw = draw;
    }));
    this.subs.push(this.adminHttp.getHistoryData().pipe(
      map(x => {
        return x.data.reverse()[0]
      })
    ).subscribe(resp =>{
      console.log(Object.values(resp).slice(3))
      const data = Object.values(resp);
      this.wondraw = data.slice(3)
    }))
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
  }

  compare(col){
    return this.wondraw.includes(col);
  }

  get headers(){
    let headers = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.MAS', 'S.L.MAS'];
    headers.splice(this.draw.ballsqty, headers.length-this.draw.ballsqty)
    return headers;
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
