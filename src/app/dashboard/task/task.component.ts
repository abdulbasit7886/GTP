import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent{
  user: any;
  taskTitle: string = '';
  taskDescription: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.http.get<any>('http://localhost:5000/api/user').subscribe(
  //     (data) => this.user = data.user,
  //     (error) => this.message = 'Failed to fetch user details.'
  //   );
  // }

  createTask(): void {
    if (!this.taskTitle || !this.taskDescription || !this.user) {
      this.message = 'All fields are required.';
      return;
    }
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Adding JSON content type
    });
  
    const taskData = { 
      title: this.taskTitle, 
      description: this.taskDescription, 
      userId: this.user.id 
    };
  
    this.http.post('http://localhost:5000/api/tasks', taskData, { headers }).subscribe(
      (response) => {
        console.log('Task created:', response);  // Logging response for debugging
        alert('Task created successfully!');
        this.taskTitle = '';
        this.taskDescription = '';
      },
      (error) => {
        console.error('Error creating task:', error);  // Logging error for debugging
        this.message = 'Error creating task.';
      }
    );
  }
}
