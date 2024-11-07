import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CountertaskModule } from './countertask/countertask.module';
import { CounterComponent } from './countertask/counter/counter.component';

@NgModule({
  declarations: [AppComponent,CounterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CountertaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
