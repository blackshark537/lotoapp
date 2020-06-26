import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogginPage } from './loggin.page';

const routes: Routes = [
  {
    path: '',
    component: LogginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogginPageRoutingModule {}
