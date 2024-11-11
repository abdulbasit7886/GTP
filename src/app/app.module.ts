import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CalculaterComponent } from './calculater/calculater.component';
import {CalculaterRoutingModule} from '../app/calculater/calculater-routing.module';
import {FormsModule} from '@angular/forms'
@NgModule({
  declarations: [AppComponent, CalculaterComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,CalculaterRoutingModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
