import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private countSource = new BehaviorSubject<number>(1);
  currentCount = this.countSource.asObservable();
  increment() {
    this.countSource.next(this.countSource.value + 1);
  }
  decrement() {
    this.countSource.next(this.countSource.value - 1);
  }
}