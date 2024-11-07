import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormRoutingModule } from './reactive-form-routing.module';
import {ReactiveFormsModule} from'@angular/forms'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveFormModule { }
