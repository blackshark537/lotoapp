import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';
import { AdminDraw } from '../models/draw.model';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { EDIT } from '../actions/admin_draw.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  draw: AdminDraw;
  game: number;
  header: string[]=[];
  numbersAvailable: number[] = [];
  numbersLmasAvailable: number[] = [];
  numbersSLmasAvailable: number[] = [];
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private store: Store<StoreModel>,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.game = parseInt(this.activatedRoute.snapshot.paramMap.get('game'));

    await this.store.select('admin_draw').subscribe(resp =>{
      let a = resp.filter((value)=> value._id === id);
      a = [...a];
      this.draw = {...a[0]};
    });

    if(this.draw){
      this.draw = {...this.draw};
      this.draw.Games = [...this.draw.Games];
      this.draw.Games[this.game] = {...this.draw.Games[this.game]};
      
      if(this.draw.Games[this.game].Data.length === 0){
        this.wipeData();
      }
    }

    let headers = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.MAS', 'S.L.MAS'];
    headers.map((head, i)=>{
      if(i < this.draw.ballsqty) this.header.push(head);
    });

  }

  wipeData(){
    this.numbersAvailable = [];
    this.numbersLmasAvailable = [];
    this.numbersSLmasAvailable = [];
    this.draw.Games[this.game].Data = [];
    for(let i = 0; i < this.draw.max_values; i++){
      this.numbersAvailable.push(i+1);
      if(i < 11) this.numbersSLmasAvailable.push(i+1);
      if(i < 16) this.numbersLmasAvailable.push(i+1);
    }
  }


  async pushOne(){
    let availables = [];
    
    if(this.draw.Games[this.game].Data.length > 5){
      availables = this.numbersLmasAvailable;
    } else if(this.draw.Games[this.game].Data.length > 6){
      availables = this.numbersSLmasAvailable;
    }else {
      availables = this.numbersAvailable;
    }

    const modal = await this.modalCtrl.create({
      animated: true,
      backdropDismiss: false,
      component: ModalComponent,
      swipeToClose: false,
      componentProps: {
        data: availables
      }
    });

    await modal.present();
    const {data} = await modal.onWillDismiss();
    const choosed: number[] = data.choosed
    if(choosed){
      this.draw.Games[this.game].Data.push(choosed);
      this.numbersAvailable.map((value1, i) =>{
        choosed.map(value2=> {
          if(value2 === value1){
            this.numbersAvailable.splice(i, 1);
          }
        })
      });
    }
  }

  async save(){
    this.store.dispatch(EDIT({index: 0, Draw: this.draw}));
    this.router.navigate(['sorteos']);
  }

}
