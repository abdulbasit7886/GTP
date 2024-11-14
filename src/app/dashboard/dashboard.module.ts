import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewComponent } from './view/view.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditpostComponent } from './editpost/editpost.component';
import { UserRoutingModule } from './user/user-routing.module';


@NgModule({
  declarations: [
    CreatepostComponent,
    EditpostComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,RouterModule,ReactiveFormsModule,UserRoutingModule
  ]
})
export class DashboardModule { }
