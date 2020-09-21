import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FormComponent } from './components/form/form.component';
import { Store } from '@ngrx/store';
import { GET, DEL, EDIT } from 'src/app/actions/admin_draw.action';
import { ADMIN_RECICLE } from 'src/app/actions/user.actions';
import { Draw, AdminDraw } from '../models/draw.model';
import { StoreModel } from '../models/store.model';
import { Observable } from 'rxjs';
import { NativeHelpersService } from '../services/native-helpers.service';
import * as EXEL from 'xlsx';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sorteo',
  templateUrl: './sorteo.page.html',
  styleUrls: ['./sorteo.page.scss'],
})
export class SorteoPage implements OnInit {

  selectedIndex: number
  draw$: Observable<AdminDraw[]>;
  filtro:string = '';
  draw: Draw;
  edit: boolean;
  currDate = new Date(Date.now());
  labels = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'QUARTO', 'QUINTO', 'SEXTO', 'L.Más', 'L.S.Más'];

  constructor(
    private native: NativeHelpersService,
    private actionController: ActionSheetController,
    private modalController: ModalController,
    private store: Store<StoreModel>
  ) { }


  ngOnInit() {
    this.edit= false;
    this.draw$ = this.store.select('admin_draw');
    this.store.dispatch(GET());
  }

  filter(value){
    this.filtro = value;
  }

  get matdesign(): boolean{
    return this.native.matdesign;
  }

  expDate(date){
    return new Date(date);
  }

  async openActions(index: number, draw: Draw){
    
    this.selectedIndex = index;
    this.draw = draw;
      const actionSheet = await this.actionController.create({
        header: 'Acciones',
        translucent: true,
        animated: true,
        buttons: [
          {
            text: 'editar',
            icon: 'pencil',
            handler: () => { this.edit = true; this.openModal() }
          },
          {
            text: 'descargar plantilla',
            icon: 'document',
            handler: () => { window.location.href = '/assets/template.xlsx' }
          },
          {
            text: 'reciclar',
            icon: 'trash',
            cssClass: 'delete',
            role: 'destructive',
            handler: () => { this.del_one() }
          },
          {
            text: 'cancelar',
            icon: 'close',
            role: 'cancel'
          }
        ]
      });

      await actionSheet.present(); 
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: FormComponent,
      swipeToClose: true,
      keyboardClose: true,
      componentProps: {
        edit: this.edit,
        index: this.selectedIndex,
        Draw: {...this.draw}
      }
    });

    await modal.present();
  }

  new_one(){
    this.edit = false;
    this.openModal();
  }

  async del_one(){
    await this.store.dispatch(ADMIN_RECICLE({draw: this.draw}));
    await this.store.dispatch(DEL({id: this.draw._id}));
    await this.native.showToast('Enviado a la papelera de reciclaje!');
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

      let col = [];
      let row = [];
      for (let i = 0; i < draw.ballsqty; i++) {
        col = [];
        jsonData['data'].map(val =>{ 
          if(val[this.labels[i]] !== null && val[this.labels[i]] !== undefined){
            col.push(val[this.labels[i]]);
          }
        });
        row.push(col);
      }
      draw.Games[gameType].Data = row;
      this.store.dispatch(EDIT({index: 0, Draw: draw}));
      await this.native.showLoading();
      await this.native.showToast('Archivo guardado!!!')
    }

    if(file.type === type){
      reader.readAsBinaryString(file);
    } else {
      this.native.showError('Este tipo de archivo no es admitido');
    }
  }
}
