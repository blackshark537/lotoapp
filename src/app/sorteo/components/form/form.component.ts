import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as EXEL from 'xlsx';
import {SAVE, EDIT} from 'src/app/actions/admin_draw.action';
import { Draw } from 'src/app/models/draw.model';
import { StoreModel } from 'src/app/models/store.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input('edit') edit: boolean;
  @Input('index') index: number;
  @Input('Draw') Draw: Draw;
  
  drawForm: FormGroup;
  labels = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.Más', 'L.S.Más'];
  LotteryChoosed: any = [];
  lotteryModel = [
    {
      lottery: 'Leidsa',
      draws: [
        {
          name: 'Loto, Loto Más y Súper Más',
          balls_qty: 8,
          img: 'assets/leidsa.png'
        },
        {
          name: 'Loto Pool',
          balls_qty: 5,
          img: 'assets/loto-pool.png'
        },
        {
          name: 'Quiniela Pale',
          balls_qty: 3,
          img: 'assets/quiniela-pale.png'
        },
        {
          name: 'Pega 3 Más',
          balls_qty: 3,
          img: 'assets/pega-mas.png'
        }
      ]
    },
    {
      lottery: 'Nacional',
      draws: [
        {
          name: 'Nacional',
          balls_qty: 3,
          img: 'assets/loteria-nacional.png'
        },
        {
          name: 'Ganamás',
          balls_qty: 3,
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
          img: 'assets/loteka.png'
        }
      ]
    }
  ];

  constructor(
    private fb: FormBuilder,
    private platform: Platform,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private store: Store<StoreModel>
  ) { }

  async ngOnInit() {
    
    if(this.edit){
      this.drawForm = this.fb.group({
        _id: this.Draw._id,
        lottery: [this.Draw.lottery, Validators.required],
        Data: [],
        filename: this.Draw.filename,
        active: this.Draw.active,
        owner: this.Draw.owner,
        emitDate: this.Draw.emitDate,
        expiryDate: this.Draw.expiryDate,
        draw: [this.Draw.draw, Validators.required],
        ballsqty: [this.Draw.ballsqty, Validators.required],
        favorite: this.Draw.favorite,
        img: this.Draw.img
      });
    } else {
      this.drawForm = this.fb.group({
        _id: '',
        lottery: ['', Validators.required],
        Data: [],
        filename: '',
        active: true,
        owner: 'admin',
        emitDate: null,
        expiryDate: null,
        draw: ['', Validators.required],
        ballsqty: [null, Validators.required],
        favorite: false,
        img: null
      });
    }

    this.drawForm.controls['Data'].setValue(this.Draw.Data);
  }

  get lottery(){
    return this.drawForm.get('lottery');
  }

  get draw_name(){
    return this.drawForm.get('draw');
  }

  get expiryDate(){
    return this.drawForm.get('expiryDate');
  }

  get filename(){
    return this.drawForm.get('filename');
  }

  get balls_qty(){
    return this.drawForm.get('ballsqty');
  }

  get matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  set_expiryDate(evt){
    this.drawForm.setValue({ expiryDate:  new Date(evt.value)})
  }

  setDraw(value){
    let draw = JSON.parse(value);
    console.log(draw);
    this.drawForm.controls['draw'].setValue(draw.name);
    this.drawForm.controls['ballsqty'].setValue(draw.balls_qty);
    this.drawForm.controls['img'].setValue(draw.img);
  }

  setLottery(value){
    let model = JSON.parse(value);
    this.drawForm.controls['lottery'].setValue(model.lottery);
    this.LotteryChoosed = model;
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

      let col = [];
      let row = [];
      for (let i = 0; i < this.balls_qty.value; i++) {
        col = [];
        jsonData['data'].map(val => col.push(val[this.labels[i]]));
        row.push(col);
      }
      this.drawForm.controls['Data'].setValue(row);

    }

    if(file.type === type){
      this.drawForm.controls['filename'].setValue(file.name);
      reader.readAsBinaryString(file);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Este tipo de archivo no es admitido',
        duration: 5000
      });
      await toast.present();
    }
  }

  async save(){
    this.drawForm.controls['_id'].setValue(this._id);
    this.drawForm.controls['emitDate'].setValue(new Date(Date.now()));
    this.store.dispatch(SAVE(this.drawForm.value));
    this.dismiss();
  }

  async update_one(){
    this.drawForm.controls['emitDate'].setValue(new Date(Date.now()));
    this.store.dispatch(EDIT({index: this.index, Draw: this.drawForm.value}));
    this.dismiss();
  }

  async dismiss() {
    await this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  get _id(): string{
    let id = '';
    const string_list = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789';
    for(let i=0; i<20; i++){
      id += string_list[Math.floor(Math.random() * string_list.length)];
    }
    return id;
  }

}
