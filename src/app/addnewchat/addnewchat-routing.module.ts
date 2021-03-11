import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewchatPage } from './addnewchat.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewchatPageRoutingModule {}
