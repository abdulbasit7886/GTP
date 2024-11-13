import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { ViewComponent } from './dashboard/view/view.component';
import { TaskComponent } from './dashboard/task/task.component';
const routes: Routes = [
  {
    path: "signup", component: SignupComponent 
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "dashboard", component: ViewComponent
  },
  {
    path: "create-task", component:TaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
