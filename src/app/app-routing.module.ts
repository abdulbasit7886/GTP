import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './angularform/template/template.component';
import { ReactiveComponent } from './angularform/reactive/reactive.component';
const routes: Routes = [
  {path:'templateForm',component:TemplateComponent},
  {path:'reactiveForm',component:ReactiveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
