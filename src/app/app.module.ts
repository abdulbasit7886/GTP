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
import {TemplatedrivenFormComponent} from './templatedriven-form/templatedriven-form.component'

@NgModule({
  declarations: [AppComponent,ApiTaskComponent,ReactiveFormComponent,
    TemplatedrivenFormComponent
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
    TemplatedrivenFormRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
