import { Component, OnInit } from '@angular/core';
import { CounterService } from './countertask/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GTP';
  count: number = 0;
  constructor(private counterService: CounterService){}
  ngOnInit(){
    this.counterService.currentValue.subscribe((count) => {
      this.count = count
    })
  }
}
