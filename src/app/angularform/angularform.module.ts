import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularformRoutingModule } from './angularform-routing.module';
import { TemplateComponent } from './template/template.component';
import { ReactiveComponent } from './reactive/reactive.component';


@NgModule({
  declarations: [
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    CommonModule,
    AngularformRoutingModule
  ]
})
export class AngularformModule { }
