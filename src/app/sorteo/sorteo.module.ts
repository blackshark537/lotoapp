import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';

import { SorteoPageRoutingModule } from './sorteo-routing.module';

import { SorteoPage } from './sorteo.page';
import { FormComponent } from './components/form/form.component'

@NgModule({
  entryComponents:[FormComponent],
  imports: [
    CommonModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    FormsModule,
    IonicModule,
    SorteoPageRoutingModule
  ],
  declarations: [SorteoPage, FormComponent]
})
export class SorteoPageModule {}
