import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayUserInfoComponent} from './display-user-info.component'

const routes: Routes = [
  {path: 'info', component: DisplayUserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayUserInfoRoutingModule { }
