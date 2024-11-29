import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPannelRoutingModule } from './admin-pannel-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    SearchUserComponent,
    AdminHomepageComponent,
    AdminLoginComponent,
    AdminSignupComponent
  ],
  imports: [
    CommonModule,
    AdminPannelRoutingModule
  ]
})
export class AdminPannelModule { }
