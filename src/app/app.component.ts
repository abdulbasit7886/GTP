
import { Component, OnInit } from '@angular/core';
import { CounterService } from './countertask/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GTP';
  count: number = 1;

  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.counterService.currentCount.subscribe((count) => {
      this.count = count;
    });
  }
}
