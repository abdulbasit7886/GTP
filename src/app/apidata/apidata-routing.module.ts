import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataviewComponent } from './dataview/dataview.component';

const routes: Routes = [
  { path: 'users', component: DataviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApidataRoutingModule { }
