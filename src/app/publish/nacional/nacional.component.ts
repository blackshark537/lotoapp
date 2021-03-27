import { Component, OnInit } from '@angular/core';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AdminhttpService } from 'src/app/services/adminhttp.service';

@Component({
  selector: 'app-nacional',
  templateUrl: './nacional.component.html',
  styleUrls: ['./nacional.component.scss'],
})
export class NacionalComponent implements OnInit {

  data = []  

  constructor(
    public adminGuard: AdminGuard,
    private _adminService: AdminhttpService 
  ) { }

  ngOnInit() {
    this._adminService.getQuinielaHistoryData('Nacional', 'Nacional').subscribe(resp =>{
      this.data = resp.data.reverse()
    })
  }

  deleteOne(id: string){}

}
