import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LoginFormComponent} from './login-form/login-form.component'
import {DisplayUserInfoComponent} from './display-user-info/display-user-info.component'
import {signupGuard} from './signup.guard';
import {loginGuard} from './login.guard';
import {displayInfoGuard} from './display-info.guard'
const routes: Routes = [
  {path: 'signup', component: SignUpComponent, canActivate: [signupGuard]},
  {path: 'login', component: LoginFormComponent, canActivate: [loginGuard]},
  {path: 'info', component: DisplayUserInfoComponent, canActivate: [displayInfoGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
