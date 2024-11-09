import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  user: any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
}
