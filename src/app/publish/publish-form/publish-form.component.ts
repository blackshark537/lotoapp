import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminhttpService } from 'src/app/services/adminhttp.service';
import { NativeHelpersService } from 'src/app/services/native-helpers.service';
import * as EXEL from 'xlsx';
import { AdminDraw } from '../../models/draw.model';

@Component({
  selector: 'app-publish-form',
  templateUrl: './publish-form.component.html',
  styleUrls: ['./publish-form.component.scss'],
})
export class PublishFormComponent implements OnInit {

  constructor(
    private adminService: AdminhttpService,
    private native: NativeHelpersService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

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

}
