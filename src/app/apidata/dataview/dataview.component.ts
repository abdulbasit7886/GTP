import { Component } from '@angular/core';
import {UserService} from '../service/user.service'

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.css']
})
export class DataviewComponent {
  users:any
  constructor(private userData:UserService)
  {
    userData.users().subscribe((data)=>{
      console.log('data',data);
      this.users = data;
    })
  }
}
