import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from "./form/reactive/reactive/reactive.component";
import { TemplateComponent } from './form/template/template/template.component';
const routes: Routes = [
  {
    path: "reactive", component: ReactiveComponent
  },
  {path : "templete", component : TemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
