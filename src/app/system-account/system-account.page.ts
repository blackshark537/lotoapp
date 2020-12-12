import { Component, OnInit } from '@angular/core';
import { SystemAccounting } from '../models/user.model';
import { AdminhttpService } from '../services/adminhttp.service';

@Component({
  selector: 'app-system-account',
  templateUrl: './system-account.page.html',
  styleUrls: ['./system-account.page.scss'],
})
export class SystemAccountPage implements OnInit {

  systemAccount: SystemAccounting[] = [];

  constructor(
    private adminHttpService: AdminhttpService
  ) { }

  ngOnInit() {
    this.adminHttpService.getSysAccounting().subscribe(resp => {
      this.systemAccount = resp;
    });
  }

  get Total(){
    let total = 0;
    this.systemAccount.forEach(element => {
      total += element.importe;
    });
    return total;
  }
}
