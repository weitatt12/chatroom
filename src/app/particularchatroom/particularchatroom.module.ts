import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticularchatroomPageRoutingModule } from './particularchatroom-routing.module';

import { ParticularchatroomPage } from './particularchatroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticularchatroomPageRoutingModule
  ],
  declarations: [ParticularchatroomPage]
})
export class ParticularchatroomPageModule {}
