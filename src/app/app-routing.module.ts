import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LoginFormComponent} from './login-form/login-form.component'
import{ProfileComponent} from './profile/profile.component';
import{authenticateGuard} from './guards/authenticate.guard';
import{UserInfoComponent} from './user-info/user-info.component'
import{TimelineComponent} from './timeline/timeline.component'
const routes: Routes = [
  {path: 'signup', component: SignUpComponent },
  {path: 'login', component: LoginFormComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authenticateGuard]},
  {path: 'timeline', component: TimelineComponent, canActivate: [authenticateGuard]},
  {path: 'userprofile', component: UserInfoComponent, canActivate: [authenticateGuard]},
  {path: '**', redirectTo: '/signup'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
