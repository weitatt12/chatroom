import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewchatPageRoutingModule } from './addnewchat-routing.module';

import { AddnewchatPage } from './addnewchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewchatPageRoutingModule
  ],
  declarations: [AddnewchatPage]
})
export class AddnewchatPageModule {}
