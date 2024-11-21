import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './tasks/tasks.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    ViewComponent,
    TaskComponent,
    NavbarComponent,
    HomeComponent,
    TimelineComponent,
    MenuComponent,
    AboutComponent,
    UsersComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
    
  ]
})
export class DashboardModule { }
