import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LotteryPage } from './lottery.page';

const routes: Routes = [
  {
    path: '',
    component: LotteryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotteryPageRoutingModule {}
