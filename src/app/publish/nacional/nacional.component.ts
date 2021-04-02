import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AdminhttpService } from 'src/app/services/adminhttp.service';

@Component({
  selector: 'app-nacional',
  templateUrl: './nacional.component.html',
  styleUrls: ['./nacional.component.scss'],
})
export class NacionalComponent implements OnInit, OnDestroy {

  data$: Observable<any>;
  

  constructor(
    public adminGuard: AdminGuard,
    private _adminService: AdminhttpService 
  ) { }

  ngOnInit() {
    this.data$ = this._adminService.getQuinielaHistoryData('Nacional', 'Nacional').pipe(
      shareReplay(1),
      map(actions => actions.data.reverse())
    );
  }

  ngOnDestroy(){
    
  }

  deleteOne(id: string){
    this._adminService.deleteOneQuinielaHistoryDraw(id);
  }

}
