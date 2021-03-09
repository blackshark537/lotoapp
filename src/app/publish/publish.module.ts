import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishPageRoutingModule } from './publish-routing.module';

import { PublishPage } from './publish.page';
import { PublishFormComponent } from './publish-form/publish-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishPageRoutingModule
  ],
  declarations: [PublishPage, PublishFormComponent]
})
export class PublishPageModule {}
