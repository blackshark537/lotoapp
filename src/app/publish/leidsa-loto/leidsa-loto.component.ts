import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { NativeHelpersService } from 'src/app/services/native-helpers.service';
import { AdminhttpService } from '../../services/adminhttp.service';

@Component({
  selector: 'app-leidsa-loto',
  templateUrl: './leidsa-loto.component.html',
  styleUrls: ['./leidsa-loto.component.scss'],
})
export class LeidsaLotoComponent implements OnInit, OnDestroy {

  data: any[] = []
  subs: Subscription

  constructor(
    public adminGuard: AdminGuard,
    private adminService: AdminhttpService,
  ) { }

  ngOnInit() {
    this.subs = this.adminService.getHistoryData().pipe(
      map(resp => resp.data.map(el => {
        return el
      }).slice(100).reverse())
    ).subscribe(resp => {
      this.data = resp;
    });
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  deleteOne(id: string){  
    this.adminService.deleteOneDrawData(id);
  }
}
