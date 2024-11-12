import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './tasks/tasks.component';



@NgModule({
  declarations: [
    ViewComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
    
  ]
})
export class DashboardModule { }
