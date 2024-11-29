import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { CreatepostComponent } from './dashboard/createpost/createpost.component';
import { ViewComponent } from './dashboard/view/view.component';
import { EditpostComponent } from './dashboard/editpost/editpost.component';
import { UserprofileComponent } from './dashboard/user/userprofile/userprofile.component';
import { dashboardGuard } from './dashboard.guard';
import { editpostGuard } from './editpost.guard';
import { postsGuard } from './posts.guard';
import { userinfoGuard } from './userinfo.guard';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SearchComponent } from './dashboard/search/search.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { AdminHomepageComponent } from './admin-pannel/admin-homepage/admin-homepage.component';

const routes: Routes = [
  {
    path: "signup", component: SignupComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "dashboard", component: ViewComponent, canActivate:[dashboardGuard]
  },
  {
    path :'createpost', component:CreatepostComponent, canActivate:[postsGuard]
  },
  {
    path : 'editpost', component:EditpostComponent, canActivate:[editpostGuard]
  },
  {
    path: 'userinfo', component:UserprofileComponent, canActivate:[userinfoGuard]
  },
  {
    path: 'profile', component:ProfileComponent
  },
  { path: 'search', component: SearchComponent },
  {path: 'notifications', component:NotificationComponent},
  {path:'admin-home',component:AdminHomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
