import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Draw } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  dateNow=new Date(Date.now());

  draws$: Observable<Draw[]>

  constructor(
    private store: Store<StoreModel>
  ) { }

  ngOnInit() {
    this.draws$ = this.store.select('admin_draw')
  }

  date(expiryDate){
    return new Date(expiryDate);
  }

}
