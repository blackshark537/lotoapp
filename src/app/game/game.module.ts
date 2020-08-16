import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { CustomGameComponent } from './custom-game/custom-game.component';

@NgModule({
  entryComponents: [CustomGameComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule
  ],
  declarations: [GamePage, CustomGameComponent]
})
export class GamePageModule {}
