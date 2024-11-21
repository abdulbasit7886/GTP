import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { ViewComponent } from './dashboard/view/view.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './authentication/auth.guard';
import { TaskComponent } from './dashboard/tasks/tasks.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { HomeComponent } from './dashboard/home/home.component';
import { TimelineComponent } from './dashboard/timeline/timeline.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { AboutComponent } from './dashboard/about/about.component';
import { UsersComponent } from './dashboard/users/users.component';
import { NotificationComponent } from './dashboard/notification/notification.component';


const routes: Routes = [
  
  {
    path: '', component: HomeComponent
  },
  {
    path: "create", component: ViewComponent
  },
  {
    path: "tasks", component: TaskComponent
  },
 {
    path: "nav", component: NavbarComponent
 },
 {
  path: "users", component: UsersComponent
},

 {
  path: "menu", component: MenuComponent
},

{
  path: "notification", component: NotificationComponent
},

{
  path: "about", component: AboutComponent
},

 {
  path: "timeline", component: TimelineComponent
},
  { path: 'dashboard', component: DashboardModule, canActivate: [AuthGuard] } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
