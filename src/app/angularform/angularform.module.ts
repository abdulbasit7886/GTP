import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularformRoutingModule } from './angularform-routing.module';
import { TemplateComponent } from './template/template.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    CommonModule,
    AngularformRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AngularformModule { }
