import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private countSource = new BehaviorSubject <number> (0);
  currentValue = this.countSource.asObservable();
  increment(){
    this.countSource.next(this.countSource.value + 1);
  }
  decrement(){
    if(this.countSource.value > 0){
      this.countSource.next(this.countSource.value - 1)
    } else if(this.countSource.value === 0){
      alert("Counter is zero")
    }
  }
  reset(){
    if(this.countSource.value === 0){
      alert('Counter is already at zero')
    }else{
      this.countSource.next(0)
    }
  }
}
