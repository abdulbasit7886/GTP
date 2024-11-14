import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { ViewComponent } from './dashboard/view/view.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './authentication/auth.guard';
import { TaskComponent } from './dashboard/tasks/tasks.component';

const routes: Routes = [
  
  {
    path: "dashboard", component: ViewComponent
  },
  {
    path: "tasks", component: TaskComponent
  },
  { path: 'dashboard', component: DashboardModule, canActivate: [AuthGuard] } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
