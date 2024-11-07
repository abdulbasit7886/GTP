import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  count: number = 0;
  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();
  increment(){
    this.count ++;
    this.countChange.emit(this.count);
  }
  decrement(){
    if(this.count > 0){
    this.count --;
    this.countChange.emit(this.count);
  }
}
}
