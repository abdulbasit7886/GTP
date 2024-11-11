import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from './components/users/signup/signup.component';
import { LoginComponent } from './components/users/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
@NgModule({
  declarations: [AppComponent, HeaderComponent, ButtonComponent, TasksComponent, TaskItemComponent, SignupComponent, LoginComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FontAwesomeModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
