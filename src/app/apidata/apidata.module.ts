import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataviewComponent } from './dataview/dataview.component';
import { ApidataRoutingModule } from './apidata-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DataviewComponent
  ],
  imports: [
    CommonModule,
    ApidataRoutingModule,
    HttpClientModule
  ]
})
export class ApidataModule { }
