//ap.component.ts
import { Component } from '@angular/core';
import {UserService}from '../app/apidata/service/user.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';
  users:any;
  constructor(private userData:UserService)
  {
    userData.users().subscribe((data)=>{
      console.log('data',data);
      this.users = data;
    })
  }
}
