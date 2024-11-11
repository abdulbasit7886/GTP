import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8000/tasks'

  constructor(private http: HttpClient) { }

  // Get all tasks for the authenticated user
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/all-tasks`, { withCredentials: true });
  }

  // Create a new task
  createTask(task: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-task`, task, { withCredentials: true });
  }

  // Update an existing task
  updateTask(id: string, task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-task/${id}`, task, { withCredentials: true });
  }

  // Delete a task by its ID
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-task/${id}`, { withCredentials: true });
  }
}
