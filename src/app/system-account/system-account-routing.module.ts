import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemAccountPage } from './system-account.page';

const routes: Routes = [
  {
    path: '',
    component: SystemAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemAccountPageRoutingModule {}
