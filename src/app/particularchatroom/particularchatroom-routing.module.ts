import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticularchatroomPage } from './particularchatroom.page';

const routes: Routes = [
  {
    path: '',
    component: ParticularchatroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticularchatroomPageRoutingModule {}
