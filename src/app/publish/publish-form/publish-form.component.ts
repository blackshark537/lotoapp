import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminhttpService } from 'src/app/services/adminhttp.service';
import { NativeHelpersService } from 'src/app/services/native-helpers.service';
import { environment } from 'src/environments/environment'
import * as EXEL from 'xlsx';

@Component({
  selector: 'app-publish-form',
  templateUrl: './publish-form.component.html',
  styleUrls: ['./publish-form.component.scss'],
})
export class PublishFormComponent implements OnInit {
  
  segment = 'Manual'
  Draws: any[] = [];
  
  _selectedLottery: string;
  _selectedDraw: string;

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
    lottery: null,
    draw: null,
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
    {
      lottery: 'Nacional',
      draws: [
        {
          name: 'Nacional',
          balls_qty: 3,
          max_values: 100,
          img: 'assets/loteria-nacional.png'
        },
        /* {
          name: 'Ganamás',
          balls_qty: 3,
          max_values: 100,
          img: 'assets/loteria-nacional-gana-mas.png'
        } */
      ]
    },
    /*{
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

  get activeFile(){
    return !environment.production
  }

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

      jsonData['SORTEOS'].forEach(element => {
        element.lottery = this._selectedLottery;
        element.draw = this._selectedDraw;
      });
      
      let lotter = null;

      if(!Object.keys(jsonData['SORTEOS'][0]).includes('LOTO_MAS')){
        lotter='quiniela'  
      } 

      this.adminService.postDrawDataFile(jsonData['SORTEOS'], lotter).subscribe(async resp =>{
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
    const lotter = JSON.parse(value);
    this._selectedLottery = lotter.lottery;
    this.Draws = lotter.draws
  }

  selectedDraw(value: string){
    const draw = JSON.parse(value);
    this._selectedDraw = draw.name
    const list = Object.keys(this.publishModel).slice(2);
    this.modelList = [...list.slice(0,draw.balls_qty)]
  }

  saveData(){
    this.publishModel.lottery = this._selectedLottery;
    this.publishModel.draw = this._selectedDraw;

    if(this._selectedLottery === 'Leidsa'){
      
      this.adminService.postOneDrawData(this.publishModel).subscribe(async resp =>{
        await this.native.showLoading();
        await this.native.showToast(resp.msg);
        this.closeModal();
      }, async error => await this.native.showToast(error));

    } else {
      
      delete this.publishModel['Sorteo'];
      delete this.publishModel['4to'];
      delete this.publishModel['5to'];
      delete this.publishModel['6to'];
      delete this.publishModel['LOTO_MAS'];
      delete this.publishModel['S_LOTO_MAS'];

      this.adminService.postOneQuinielaHistoryDraw(this.publishModel).subscribe(async resp =>{
        await this.native.showLoading();
        await this.native.showToast(resp.msg);
        this.closeModal();
      }, async error => await this.native.showToast(error));

    }
    /* */
  }

  async closeModal(){
    await this.modalCtrl.dismiss();
  }

}
