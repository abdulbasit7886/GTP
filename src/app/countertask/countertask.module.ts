import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountertaskRoutingModule } from './countertask-routing.module';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, CountertaskRoutingModule],
})
export class CountertaskModule {}
