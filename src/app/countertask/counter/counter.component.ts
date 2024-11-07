import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  count: number = 0; 

  @Output() countChange: EventEmitter<number> = new EventEmitter<number>(); 

  increment() {
    this.count++;
    this.countChange.emit(this.count); 
  }

  decrement() {
    this.count--;
    this.countChange.emit(this.count);
  }
}
