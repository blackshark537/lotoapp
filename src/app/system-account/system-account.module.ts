import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SystemAccountPageRoutingModule } from './system-account-routing.module';

import { SystemAccountPage } from './system-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SystemAccountPageRoutingModule
  ],
  declarations: [SystemAccountPage]
})
export class SystemAccountPageModule {}
