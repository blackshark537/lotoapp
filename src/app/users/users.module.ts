import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';
import { ModalComponent } from './modal/modal.component';
import { UsersPage } from './users.page';

@NgModule({
  entryComponents:[ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule
  ],
  declarations: [UsersPage, ModalComponent]
})
export class UsersPageModule {}
