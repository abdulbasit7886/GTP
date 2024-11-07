import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataviewComponent } from './dataview/dataview.component';
// import { AppComponent } from '../app.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApidataRoutingModule { }
