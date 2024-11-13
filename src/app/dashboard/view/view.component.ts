import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  tasks: any[] = []; 
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any[]>('http://localhost:5000/api/viewTasks', { headers }).subscribe(
      (data) => {
        this.tasks = data; 
      },
      (error) => {
        this.message = 'Failed to fetch tasks.';
      }
    );
  }
}
