import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LotteryPageRoutingModule } from './lottery-routing.module';

import { LotteryPage } from './lottery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LotteryPageRoutingModule
  ],
  declarations: [LotteryPage]
})
export class LotteryPageModule {}
