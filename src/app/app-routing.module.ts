import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { CreatepostComponent } from './dashboard/createpost/createpost.component';
import { ViewComponent } from './dashboard/view/view.component';
import { EditpostComponent } from './dashboard/editpost/editpost.component';
import { UserprofileComponent } from './dashboard/user/userprofile/userprofile.component';
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
  },
  {
    path : 'editpost', component:EditpostComponent
  },
  {
    path: 'userinfo', component:UserprofileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
