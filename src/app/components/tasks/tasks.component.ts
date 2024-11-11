import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  newTask: Task = { _id: '', task: '', userID: '', createdAt: '' };
  isEditing = false;
  taskToEdit: Task | null = null;
  loading = false;
  errorMessage: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  // Load all tasks
  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to load tasks. Please try again later.';
        console.error('Error fetching tasks:', error);
      }
    );
  }

  // Create a new task
  createTask(): void {
    if (!this.newTask.task.trim()) {
      this.errorMessage = 'Task description is required!';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.taskService.createTask(this.newTask).subscribe(
      (response) => {
        this.tasks.push(response.task);
        this.newTask = { _id: '', task: '', userID: '', createdAt: '' };
        this.loading = false;
        console.log('Task created successfully');
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to create task. Please try again later.';
        console.error('Error creating task:', error);
      }
    );
  }

  // Start editing a task
  editTask(task: Task): void {
    this.isEditing = true;
    this.taskToEdit = { ...task };
  }

  // Update an existing task
  updateTask(): void {
    if (this.taskToEdit) {
      this.loading = true;
      this.errorMessage = '';

      this.taskService.updateTask(this.taskToEdit._id, this.taskToEdit).subscribe(
        (response) => {
          const index = this.tasks.findIndex(task => task._id === this.taskToEdit?._id);
          if (index !== -1) {
            this.tasks[index] = response.task;
          }
          this.isEditing = false;
          this.taskToEdit = null;
          this.loading = false;
          console.log('Task updated successfully');
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to update task. Please try again later.';
          console.error('Error updating task:', error);
        }
      );
    }
  }

  // Delete a task

deleteTask(task: Task): void {
  this.loading = true;
  this.errorMessage = '';
  this.taskService.deleteTask(task._id).subscribe(
    () => {
      this.tasks = this.tasks.filter(t => t._id !== task._id);
      this.loading = false;
      console.log('Task deleted successfully');
    },
    (error) => {
      this.loading = false;
      this.errorMessage = 'Failed to delete task. Please try again later.';
      console.error('Error deleting task:', error);
    }
  );
}


  // Cancel editing and reset the form
  cancelEditing(): void {
    this.isEditing = false;
    this.taskToEdit = null;
  }
}
