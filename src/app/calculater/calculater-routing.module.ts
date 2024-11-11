import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculaterComponent} from '../calculater/calculater.component'
const routes: Routes = [
  {path: 'cal', component: CalculaterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculaterRoutingModule { }