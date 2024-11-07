import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Counter Task';
  count: number = 0;

 UpdateCounter(newCount: number){
  this.count = newCount;
 }
}
