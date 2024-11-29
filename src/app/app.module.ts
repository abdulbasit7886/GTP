import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserprofileComponent } from './dashboard/user/userprofile/userprofile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent,UserprofileComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,FormsModule,
    AuthenticationModule,ReactiveFormsModule,RouterModule
    ,MatSnackBarModule,BrowserAnimationsModule],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent,DashboardModule],
})
export class AppModule {}
