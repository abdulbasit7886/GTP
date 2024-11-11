import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private router: Router) { }
  tasks: any[] = []
  ngOnInit(): void {
    this.checkToken();
    this.taskList();
  }

  async checkToken() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.router.navigate(['/login'])
    }
  }


  createTask() {
    let tableRow = document.getElementById('table-row');
    // Create <td> elements
    let taskInputCell = document.createElement('td');
    let taskInput = document.createElement('input');
    taskInput.name = 'taskName'
    taskInputCell.appendChild(taskInput);

    let descriptionInputCell = document.createElement('td');
    let descriptionInput = document.createElement('input');
    descriptionInput.name = 'taskDescription'
    descriptionInputCell.appendChild(descriptionInput);

    let buttonCell = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = 'Create';
    button.addEventListener('click', () => this.add(taskInput.value, descriptionInput.value))
    buttonCell.appendChild(button);

    // Append all <td> elements to the row
    tableRow?.appendChild(taskInputCell);
    tableRow?.appendChild(descriptionInputCell);
    tableRow?.appendChild(buttonCell);
  }

  async add(taskName: string, taskDescription: string) {
    const data = {
      taskName: taskName,
      taskDescription: taskDescription
    };

    try {
      // Send data to backend
      const response = await fetch('http://localhost:3000/createTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify(data)
      });

      // Check for successful response
      if (!response.ok) {
        throw new Error('Error in saving task');
      }

      const result = await response.json();
      console.log('Task created successfully:', result);
      alert('Task created successfully');
      window.location.reload();
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Failed to create task');
    }
  }

  async taskList() {
    let token = await localStorage.getItem('token')
    console.log(token, '********')
    try {
      const response = await fetch('http://localhost:3000/taskList', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        },
      })
      if (!response.ok) {
        const res = await response.json()
        console.log('res')
        throw new Error(res.message)
      } else {
        const data = await response.json()
        console.log(data, 'dtata')
        this.tasks = data
      }
    }
    catch (error) {
      console.error('An error occurred:', error);
      alert(error)
      return
    }
  }

  async deleteTask(taskId: string) {
    console.log(taskId)
    let token = await localStorage.getItem('token')
    console.log(token, '********')
    try {
      const response = await fetch(`http://localhost:3000/deleteTask/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        },
      })
      if (!response.ok) {
        const res = await response.json()
        throw new Error(res.message)
      } else {
        this.taskList()
        alert('Task deleted Successfully')
      }
    }
    catch (error) {
      console.error('An error occurred:', error);
      alert(error)
      return
    }
  }
}
