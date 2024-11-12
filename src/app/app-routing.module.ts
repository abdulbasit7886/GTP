import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { CreatepostComponent } from './dashboard/createpost/createpost.component';
import { ViewComponent } from './dashboard/view/view.component';
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
    path :'createpost', component:CreatepostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
