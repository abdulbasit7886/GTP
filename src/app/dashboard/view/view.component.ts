import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  title: string = '';
  description: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  addTask() {
    if (this.title.trim() && this.description.trim()) {
      const taskData = { title: this.title, description: this.description };

      this.taskService.createTask(taskData).subscribe({
        next: (response) => {
          console.log('Task created successfully:', response); 
          alert('Task created successfully');
          this.title = '';
          this.description = '';
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
         
          const errorMessage = err.error?.message || err.message || 'An error occurred while creating the task';
          alert(`Error creating task: ${errorMessage}`);
        }
      });
    } else {
      alert('Please enter both title and description');
    }
  }
}
