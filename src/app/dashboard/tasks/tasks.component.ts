// src/app/dashboard/task/task.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
 
  }

  
  fetchTasks(): void {
    this.taskService.getTasks().subscribe({
      
      
      next: (tasks) => {
        this.tasks = tasks;
  console.log('Fetched tasks:', tasks);

      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }
}
