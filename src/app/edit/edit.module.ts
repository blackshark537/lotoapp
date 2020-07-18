import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  entryComponents:[ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule
  ],
  declarations: [EditPage, ModalComponent]
})
export class EditPageModule {}
