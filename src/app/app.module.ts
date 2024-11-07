import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ViewComponent } from './dashboard/view/view.component';
@NgModule({
  declarations: [AppComponent,ViewComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,AuthenticationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
