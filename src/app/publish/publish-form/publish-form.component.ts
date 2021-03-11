import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Draw } from 'src/app/models/draw.model';
import { AdminhttpService } from 'src/app/services/adminhttp.service';
import { NativeHelpersService } from 'src/app/services/native-helpers.service';
import * as EXEL from 'xlsx';

@Component({
  selector: 'app-publish-form',
  templateUrl: './publish-form.component.html',
  styleUrls: ['./publish-form.component.scss'],
})
export class PublishFormComponent implements OnInit {
  
  segment = 'Manual'
  Draws: any[] = [];

  publishModel = {
    Sorteo: null,
    Fecha: null,
    '1ro': null,
    '2do': null,
    '3ro': null,
    '4to': null,
    '5to': null,
    '6to': null,
    'LOTO_MAS': null,
    'S_LOTO_MAS': null,
  }

  modelList=[];

  lotteryModel = [
    {
      lottery: 'Leidsa',
      draws: [
        {
          name: 'Loto, Loto Más y Súper Más',
          balls_qty: 8,
          max_values: 38,
          img: 'assets/leidsa2.png'
        },
        /* {
          name: 'Loto Pool',
          balls_qty: 5,
          max_values: 31,
          img: 'assets/loto-pool.png'
        },
        {
          name: 'Quiniela Pale',
          balls_qty: 3,
          max_values: 100,
          img: 'assets/quiniela-pale.png'
        },
        {
          name: 'Pega 3 Más',
          balls_qty: 3,
          max_values: 51,
          img: 'assets/pega-mas.png'
        } */
      ]
    },
/*     {
      lottery: 'Nacional',
      draws: [
        {
          name: 'Nacional',
          balls_qty: 3,
          max_values: 100,
          img: 'assets/loteria-nacional.png'
        },
        {
          name: 'Ganamás',
          balls_qty: 3,
          max_values: 100,
          img: 'assets/loteria-nacional-gana-mas.png'
        }
      ]
    },
    {
      lottery: 'Real',
      draws: [
        {
          name: 'Real',
          balls_qty: 3,
          max_values: 100,
          img: 'assets/loteria-real.png'
        }
      ]
    },
    {
      lottery: 'Loteka',
      draws: [
        {
          name: 'Quiniela',
          balls_qty: 3,
          max_values: 100,
          img: 'assets/loteka.png'
        }
      ]
    } */
  ];

  constructor(
    private adminService: AdminhttpService,
    private native: NativeHelpersService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async readfile(evt){
    
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

      console.log(jsonData['SORTEOS'])
      this.adminService.postDrawDataFile(jsonData['SORTEOS']).subscribe(async resp =>{
        await this.native.showLoading();
        console.log(resp)
        await this.native.showToast(resp.msg);
      }, async error => await this.native.showToast(error));

    }

    if(file.type === type){
      reader.readAsBinaryString(file);
    } else {
      this.native.showError('Este tipo de archivo no es admitido');
    }
  }

  selectedLottery(value: string){
    this.Draws = JSON.parse(value).draws
  }

  selectedDraw(value: string){
    const draw = JSON.parse(value);
    const list = Object.keys(this.publishModel).slice(2);
    this.modelList = [...list.slice(0,draw.balls_qty)]
  }

  saveData(){
    
    this.adminService.postOneDrawData(this.publishModel).subscribe(async resp =>{
        await this.native.showLoading();
        await this.native.showToast(resp.msg);
        this.closeModal();
    }, async error => await this.native.showToast(error));
  }

  async closeModal(){
    await this.modalCtrl.dismiss();
  }

}
