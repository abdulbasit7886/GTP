import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CountertaskModule } from './countertask/countertask.module';



import{ReactiveFormsModule} from '@angular/forms';
import{FormsModule} from'@angular/forms'


import { SignUpComponent } from './sign-up/sign-up.component'
import {SignUpRoutingModule} from './sign-up/sign-up-routing.module';
import { LoginFormComponent } from './login-form/login-form.component'
import {LoginFormRoutingModule} from './login-form/login-form-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UserInfoComponent } from './user-info/user-info.component'



@NgModule({
  declarations: [AppComponent,
    SignUpComponent,
    LoginFormComponent,
    ProfileComponent,
    TimelineComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CountertaskModule,
   
    FormsModule,
    ReactiveFormsModule,
   
    SignUpRoutingModule,
    LoginFormRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
