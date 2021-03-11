import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SystemAccounting } from '../models/user.model';
import { AdminhttpService } from '../services/adminhttp.service';

@Component({
  selector: 'app-system-account',
  templateUrl: './system-account.page.html',
  styleUrls: ['./system-account.page.scss'],
})
export class SystemAccountPage implements OnInit, OnDestroy {

  systemAccount: SystemAccounting[] = [];
  sub$: Subscription;

  constructor(
    private adminHttpService: AdminhttpService
  ) { }

  ngOnInit() {
    this.sub$ = this.adminHttpService.getSysAccounting().pipe(
      map(x => x.reverse())
    ).subscribe(resp => {
      this.systemAccount = resp;
    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  get Total(){
    let total = 0;
    this.systemAccount.forEach(element => {
      total += element.importe;
    });
    return total;
  }
}
