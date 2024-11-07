import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{TemplatedrivenFormComponent} from '../templatedriven-form/templatedriven-form.component'

const routes: Routes = [
  {path: 'driven', component: TemplatedrivenFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatedrivenFormRoutingModule { }
