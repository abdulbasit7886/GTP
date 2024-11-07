import { Component } from '@angular/core';
import {UsersDataService} from '../services/users-data.service'
@Component({
  selector: 'app-api-task',
  templateUrl: './api-task.component.html',
  styleUrls: ['./api-task.component.css']
})
export class ApiTaskComponent {
  userdata:any;
  constructor(private userData:UsersDataService){
    userData.userdata().subscribe((data)=>{
      console.warn("data",data );
      this.userdata=data
    })
  }
  
}
