import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ViewComponent } from './view/view.component';
// import { DashboardRoutingModule } from "./dashbord-routing.module";

import { DashboardRoutingModule } from './dashbord-routing.module';
import { CreatepostComponent } from './createpost/createpost.component';
import { EditpostComponent } from './editpost/editpost.component';




@NgModule({
  declarations: [
    
  
    CreatepostComponent,
            EditpostComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
