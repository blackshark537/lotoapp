import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Draw, AdminDraw } from '../models/draw.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  draw: AdminDraw;
  game: number;
  header: string[]=[];

  constructor(
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

    console.log(this.draw);
    if(this.draw){
      this.draw = {...this.draw};
      this.draw.Games = [...this.draw.Games];
      this.draw.Games[this.game] = {...this.draw.Games[this.game]};
      this.draw.Games[this.game].Data = [];
    }

    let headers = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.MAS', 'S.L.MAS'];
    headers.map((head, i)=>{
      if(i < this.draw.ballsqty) this.header.push(head);
    });

  }


  pushOne(){
    /* let d = [0,1,2,3,4,5,6,7]
    this.draw.Games[this.game].Data.push(d); */
  }

}
