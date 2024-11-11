import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formRoutingModule } from "./form-routing.module";

import { TemplateComponent } from './template/template/template.component';
import { ReactiveComponent } from './reactive/reactive/reactive.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    formRoutingModule,
    ReactiveFormsModule
  ]
})
export class FormModule { }
