import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserprofileComponent } from './dashboard/user/userprofile/userprofile.component';

@NgModule({
  declarations: [AppComponent,UserprofileComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,FormsModule,AuthenticationModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent,DashboardModule],
})
export class AppModule {}
