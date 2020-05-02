import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, ActionSheetController, Platform } from '@ionic/angular';
import { PlayComponent } from './play/play.component';
import { StoreModel } from 'src/app/models/store.model';
import { Store } from '@ngrx/store';
import { Draw } from '../models/draw.model';
import { ARCHIVE_DRAW } from '../actions/user.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  draw_type: string;
  draw: Draw;
  numbers_draws: number[] = [];
  index: number=0;
  header: string[]=[];
  user_draw: Draw ={
    Data: [],
    _id: '',
    active: false,
    draw: '',
    favorite: false,
    lottery: '',
    owner: ''
  };

  constructor(
    private store: Store<StoreModel>,
    private activeRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private platform: Platform,
    private router: Router,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.header = ['primero', 'segundo', 'tercero', 'quarto', 'quinto', 'sexto', 'L.Mas', 'S.L.Mas', 'type']
    this.index = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.draw_type = '';
    this.store.select('admin_draw').subscribe(resp=>{
      let d = [...resp.slice(this.index, this.index+1)]
      this.draw = {...d[0]};
      this.user_draw = {...d[0]};
      this.user_draw.Data = [];
    });
  }

  async ngOnDestroy(){

  }

  goInicio(){
    if(this.user_draw.Data.length > 0){
      this.back()
   }else {
    this.router.navigate(['/inicio']);
   }    
  }

  async back(){
    const alert = await this.alertCtrl.create({
      header: 'Mensage!',
      message: '<strong>Deseas guardar antes de salir</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            /* this.user_draw.Data=[];
            this.numbers_draws=[]; */
            this.router.navigate(['/inicio']);
          }
        }, {
          text: 'Ok',
          handler: async () => {
            this.user_draw.emitDate = new Date(Date.now());
            this.user_draw.owner = 'user';
            await this.store.dispatch(ARCHIVE_DRAW({draw: this.user_draw}));
            this.router.navigate(['/inicio']);
          }
        }
      ]
    });

    await alert.present();
  }

  matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  async openAction(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Modos de Juego',
      buttons:[
        {
          icon: 'cash',
          text: 'Normal',
          handler: ()=>{this.openNormal()}
        },
        {
          icon: 'construct',
          text: 'Personalizado',
          handler: ()=>{this.openCustom()}
        },
        {
          icon: 'shuffle',
          text: 'Aleatorio',
          role: 'destructive',
          handler: ()=>{this.openRandom()}
        },
        {
          icon: 'close',
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openNormal(){
    this.numbers_draws = [];
    await this.normal_draw();
    this.draw_type = 'normal';
    this.openModal();
  }

  async openCustom(){
    this.numbers_draws = [];
    await this.normal_draw();
    this.draw_type = 'personalizado';
    this.openModal();
  }

  async openRandom(){
    this.numbers_draws = [];
    await this.random_draw();
    this.draw_type = 'aleatorio';
    this.openModal();
  }

  async normal_draw(){
    this.draw.Data.map((col: number[]) =>{
      this.numbers_draws.push(col[Math.floor(Math.random() * col.length)]);
    });
    this.numbers_draws.filter((value, i)=> this.numbers_draws.indexOf(value) != i);
    if(this.numbers_draws.length != 8) this.normal_draw();
  }

  async random_draw(){
    if(this.numbers_draws.length < 6) this.numbers_draws.push(Math.floor(Math.random() * 34) +1 );
    if(this.numbers_draws.length < 8) this.numbers_draws.push(Math.floor(Math.random() * 14) +1 );
    await this.numbers_draws.filter((value, i)=> this.numbers_draws.indexOf(value) === i);
    if(this.numbers_draws.length != 8) this.random_draw();
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: PlayComponent,
      swipeToClose: false,
      componentProps: {
        draw: this.numbers_draws,
        game: this.draw_type
      }
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.data.length >0) this.user_draw.Data.push(data.data);
 
  }
}
