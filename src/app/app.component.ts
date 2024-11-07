import { Component, OnInit } from '@angular/core';
import { CounterService } from './countertask/counter.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GTP';
  count: number = 1;
  users: any[] = [];

  constructor(private counterService: CounterService, private userService: UserService) {}

  ngOnInit() {
    // Subscribe to the counter value
    this.counterService.currentCount.subscribe((count) => {
      this.count = count;
    });

    // Fetch users from API
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  increment() {
    this.counterService.increment();
  }

  decrement() {
    this.counterService.decrement();
  }
}
