import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TodoListComponent } from './todolist/todolist.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
