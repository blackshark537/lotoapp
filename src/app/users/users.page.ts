import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel } from '../models/store.model';
import { GET_All_Users } from '../actions/user.actions';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  user$: Observable<UserModel[]>;

  constructor(
    private store: Store<StoreModel>
  ) { }

  ngOnInit() {

    this.user$ = this.store.select('users_profiles');

    this.store.dispatch(GET_All_Users());
  }

}
