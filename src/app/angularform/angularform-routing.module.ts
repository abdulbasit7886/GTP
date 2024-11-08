// app/angularform/angularform-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from './reactive/reactive.component';
import { TemplateComponent } from './template/template.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'reactive', component: ReactiveComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'view', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularformRoutingModule {}
