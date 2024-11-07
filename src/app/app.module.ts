import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CountertaskModule } from './countertask/countertask.module';
import {ApiTaskRoutingModule} from './api-task/api-task-routing.module';
import{ApiTaskComponent} from './api-task/api-task.component';

@NgModule({
  declarations: [AppComponent,ApiTaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CountertaskModule,
    ApiTaskRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
