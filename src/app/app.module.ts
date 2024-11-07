import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CountertaskModule } from './countertask/countertask.module';
import {ApiTaskRoutingModule} from './api-task/api-task-routing.module';
import{ApiTaskComponent} from './api-task/api-task.component';

import{ReactiveFormRoutingModule} from './reactive-form/reactive-form-routing.module'
import {ReactiveFormComponent} from './reactive-form/reactive-form.component'
import{ReactiveFormsModule} from '@angular/forms';
import{FormsModule} from'@angular/forms'

import {TemplatedrivenFormRoutingModule} from './templatedriven-form/templatedriven-form-routing.module';
import {TemplatedrivenFormComponent} from './templatedriven-form/templatedriven-form.component';
import { SignUpComponent } from './sign-up/sign-up.component'
import {SignUpRoutingModule} from './sign-up/sign-up-routing.module';
import { LoginFormComponent } from './login-form/login-form.component'
import {LoginFormRoutingModule} from './login-form/login-form-routing.module';
import { DisplayUserInfoComponent } from './display-user-info/display-user-info.component'
import {DisplayUserInfoRoutingModule} from './display-user-info/display-user-info-routing.module'



@NgModule({
  declarations: [AppComponent,ApiTaskComponent,ReactiveFormComponent,
    TemplatedrivenFormComponent,
    SignUpComponent,
    LoginFormComponent,
    DisplayUserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CountertaskModule,
    ApiTaskRoutingModule,
    ReactiveFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TemplatedrivenFormRoutingModule,
    SignUpRoutingModule,
    LoginFormRoutingModule,
    DisplayUserInfoRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
