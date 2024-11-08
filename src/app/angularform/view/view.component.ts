// app/angularform/view/view.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  formData: any;

  ngOnInit() {
    const data = sessionStorage.getItem('formData');
    this.formData = data ? JSON.parse(data) : null;
  }
}
