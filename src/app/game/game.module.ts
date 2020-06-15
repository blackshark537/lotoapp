import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';
import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { PlayComponent } from './play/play.component';
import { CustomGameComponent } from './custom-game/custom-game.component';

@NgModule({
  entryComponents: [PlayComponent, CustomGameComponent],
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    IonicModule,
    GamePageRoutingModule
  ],
  declarations: [GamePage, PlayComponent, CustomGameComponent]
})
export class GamePageModule {}
