import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router

interface Todo {
  _id: string;
  title: string;
  completed?: boolean;
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';

  constructor(private http: HttpClient, private router: Router) {}  // Inject Router here

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.http.get<Todo[]>('http://localhost:5000/api/todos', { headers: this.getAuthHeaders() })
      .subscribe(
        (todos) => this.todos = todos,
        (error) => console.error('Error fetching tasks:', error)
      );
  }

  addTask(): void {
    const newTask = { title: this.newTodoTitle };
    this.http.post<Todo>('http://localhost:5000/api/todos', newTask, { headers: this.getAuthHeaders() })
      .subscribe(
        (todo) => {
          this.todos.push(todo);
          this.newTodoTitle = ''; // Clear input after adding
        },
        (error) => console.error('Error adding task:', error)
      );
  }

  updateTask(todo: Todo): void {
    const updatedTask = { title: todo.title, completed: todo.completed };
    this.http.put<Todo>(`http://localhost:5000/api/todos/${todo._id}`, updatedTask, { headers: this.getAuthHeaders() })
      .subscribe(
        (updatedTodo) => {
          const index = this.todos.findIndex(t => t._id === todo._id);
          if (index > -1) this.todos[index] = updatedTodo;
        },
        (error) => console.error('Error updating task:', error)
      );
  }

  deleteTask(todoId: string): void {
    this.http.delete(`http://localhost:5000/api/todos/${todoId}`, { headers: this.getAuthHeaders() })
      .subscribe(
        () => this.todos = this.todos.filter(todo => todo._id !== todoId),
        (error) => console.error('Error deleting task:', error)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');  // Assume token is stored here after login
    return { 'Authorization': `Bearer ${token}` };
  }
}
