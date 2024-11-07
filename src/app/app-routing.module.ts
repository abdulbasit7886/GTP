import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataviewComponent } from './apidata/dataview/dataview.component';
const routes: Routes = [
  {path: 'dataview', component:DataviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
