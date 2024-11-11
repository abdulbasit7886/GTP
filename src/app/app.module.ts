import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator/calculator.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CalculatorComponent,AppComponent],
  imports: [BrowserModule, AppRoutingModule,FormsModule,RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}
