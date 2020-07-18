import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { PlayComponent } from '../game/play/play.component';

@NgModule({
  entryComponents:[PlayComponent],
  imports: [
    CommonModule,
    FormsModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    IonicModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage, PlayComponent]
})
export class InicioPageModule {}
