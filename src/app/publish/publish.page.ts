import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdminhttpService } from '../services/adminhttp.service';
import { NativeHelpersService } from '../services/native-helpers.service';
import * as EXEL from 'xlsx';
import { AdminDraw } from '../models/draw.model';
import { ModalController } from '@ionic/angular';
import { PublishFormComponent } from './publish-form/publish-form.component';


@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit, OnDestroy {
  data: any[] = []
  constructor(
    private native: NativeHelpersService,
    private adminService: AdminhttpService,
    private modalCtrl: ModalController
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

  async readfile(evt, draw$: AdminDraw, gameType:number){
    let draw = {...draw$};
    draw.Games = [...draw.Games];
    draw.Games[gameType] = {...draw.Games[gameType]};
    
    let workBook = null;
    let jsonData = null;
    const type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    const file: File = evt.files[0];
    const reader = new FileReader();
    
    reader.onloadend = async () =>{
      const data = reader.result;
      workBook = EXEL.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = EXEL.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      jsonData['SORTEOS']
      this.adminService.postDrawDataFile(jsonData['SORTEOS']).subscribe(async resp =>{
        await this.native.showLoading();
        console.log(resp)
        await this.native.showToast(resp.msg);
      });

    }

    if(file.type === type){
      reader.readAsBinaryString(file);
    } else {
      this.native.showError('Este tipo de archivo no es admitido');
    }
  }


  async openForm(){
    const modal = await this.modalCtrl.create({
      component: PublishFormComponent,
      componentProps:{
        lottery: ''
      }
    });

    await modal.present();
  }
}
