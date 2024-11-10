import { Component, OnInit } from '@angular/core';

interface Task{
  name: string;
  description: string;
}

@Component({
  selector: 'app-display-user-info',
  templateUrl: './display-user-info.component.html',
  styleUrls: ['./display-user-info.component.css']
})
export class DisplayUserInfoComponent implements OnInit {
 userData: any;
 tasks: Task[] = [];
 taskname: string = '';
 description: string = '';
 isEdit: boolean =false;
 editIndex: number | null = null;
 ngOnInit(){
  const getuserData = localStorage.getItem('userdata');
  if(getuserData){
    this.userData = JSON.parse(getuserData);
  }
  else{
    console.warn("No data found in storage")
  }


  const getuserTask= localStorage.getItem('tasks');
  if(getuserTask){
    this.tasks = JSON.parse(getuserTask);
  }
  else{
    console.warn("No tasks found in storage")
  }  
 }

 CreateTask(){
  const task: Task ={
    name: this.taskname,
    description: this.description
  }
  if(this.isEdit && this.editIndex !== null){
    //update task
    this.tasks[this.editIndex] =task;
    this.isEdit =false;
    this.editIndex = null;
  }
  else{
    this.tasks.push(task);
  }
  this.taskname= '';
  this.description = '';
  this.savelocalstorage();
 }

 updateTask(index: number){
  const task = this.tasks[index];
  this.taskname = task.name;
  this.description = task.description;
  this.isEdit = true;
  this.editIndex = index;
 }

 deleteTask(index: number){
 this.tasks.splice(index, 1);
if(this.isEdit && this.editIndex === index){
  this.taskname = '';
  this.description = '';
  this.isEdit = false;
  this.editIndex = null;
}
this.savelocalstorage();
  
 }
 savelocalstorage(){
  localStorage.setItem('tasks', JSON.stringify(this.tasks))
 }

}
