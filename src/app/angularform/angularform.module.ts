// app/angularform/angularform.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularformRoutingModule } from './angularform-routing.module';
import { ReactiveComponent } from './reactive/reactive.component';
import { TemplateComponent } from './template/template.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    ReactiveComponent,
    TemplateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularformRoutingModule
  ]
})
export class AngularformModule {}
