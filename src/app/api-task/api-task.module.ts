import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiTaskRoutingModule } from './api-task-routing.module';
import{ApiTaskComponent} from '../api-task/api-task.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ApiTaskComponent
  ],
  imports: [
    CommonModule,
    ApiTaskRoutingModule,
    HttpClientModule
  ]
})
export class ApiTaskModule { }
