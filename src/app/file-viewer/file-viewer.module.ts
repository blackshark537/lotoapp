import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';

import { FileViewerPageRoutingModule } from './file-viewer-routing.module';

import { FileViewerPage } from './file-viewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule,
    FileViewerPageRoutingModule
  ],
  declarations: [FileViewerPage]
})
export class FileViewerPageModule {}
