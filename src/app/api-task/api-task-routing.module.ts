import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ApiTaskComponent} from '../api-task/api-task.component'
const routes: Routes = [
  { path: 'api', component: ApiTaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiTaskRoutingModule { }
