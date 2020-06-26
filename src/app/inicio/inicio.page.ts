import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Draw, AdminDraw } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';
import * as adminAction from '../actions/admin_draw.action';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  dateNow=new Date(Date.now());

  draws$: Observable<AdminDraw[]>
  user: UserModel;

  constructor(
    private store: Store<StoreModel>
  ) { }

  ngOnInit() {
    this.draws$ = this.store.select('admin_draw');
    this.store.dispatch(adminAction.GET());

    this.store.select('user_state').subscribe(resp =>{
      this.user = {...resp};
    });
  }

  date(expiryDate){
    return new Date(expiryDate);
  }

}
