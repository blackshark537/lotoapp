import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminhttpService } from '../services/adminhttp.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit, OnDestroy {
  data: any[] = []
  constructor(
    private adminService: AdminhttpService
  ) { }

  ngOnInit() {
    this.adminService.getHistoryData().pipe(
      map(resp => resp.data.map(el => {
        return el
      }).slice(200).reverse())
    ).subscribe(resp => {
      this.data = resp;
    });
  }

  ngOnDestroy(){
    
  }

}
