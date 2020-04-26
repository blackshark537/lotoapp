import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as EXEL from 'xlsx';
import {SAVE, EDIT} from 'src/app/actions/admin_draw.action';
import { Draw } from 'src/app/models/draw.model';
import { StoreModel } from 'src/app/models/store.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input('edit') edit: boolean;
  @Input('index') index: number;

  draw: Draw;
  filename: string;
  labels = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.MAS', 'L.S.MAS'];
  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private store: Store<StoreModel>
  ) { }

  ngOnInit() {
    
    if(!this.edit){
      this.draw = {
        _id: '',
        lottery: '',
        Data: [],
        active: true,
        owner: 'admin',
        expiryDate: new Date(Date.now()),
        draw: ''
      }
    } else {
      this.store.select('admin_draw').subscribe(resp =>{
         let new_draw = [...resp.slice(this.index, 1)]
         this.draw = {...new_draw[0]};
      });
    }
    
  }

  can_save(): boolean{
    return this.draw.Data.length === 0 || this.draw.lottery === ''? false : true;
  }

  set_expiryDate(evt){
    this.draw.expiryDate = new Date(evt.value);
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

      let col;
      this.draw.Data = [];
      this.labels.map(ball =>{
        col = [];
        jsonData['data'].map(val => col.push(val[ball]));
        this.draw.Data.push(col);
      });
      
    }

    if(file.type === type){
      this.filename = file.name;
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
    this.draw._id = await this.generate_id();
    this.draw.emitDate = new Date(Date.now());
    this.store.dispatch(SAVE(this.draw));
    this.dismiss();
  }

  async update_one(){
    this.draw.emitDate = new Date(Date.now());
    this.store.dispatch(EDIT({index: this.index, Draw: this.draw}));
    this.dismiss();
  }

  async dismiss() {
    await this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async generate_id(): Promise<string>{
    let id = '';
    const string_list = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789';
    for(let i=0; i<20; i++){
      id += string_list[Math.floor(Math.random() * string_list.length)];
    }
    return id;
  }

}
