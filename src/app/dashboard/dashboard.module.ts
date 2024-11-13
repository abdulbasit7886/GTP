import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewComponent } from './view/view.component';
import { TaskComponent } from './task/task.component';


@NgModule({
  declarations: [
    ViewComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
