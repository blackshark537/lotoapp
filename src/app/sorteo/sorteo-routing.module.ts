import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SorteoPage } from './sorteo.page';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  {
    path: '',
    component: SorteoPage
  },
  {
    path: 'new',
    component: FormComponent
  },
  {
    path: 'edit/:game/:id',
    loadChildren: () => import('../edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SorteoPageRoutingModule {}
