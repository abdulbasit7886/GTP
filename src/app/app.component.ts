import { Component } from '@angular/core';
import {UsersService} from './service/users.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  users:any;
  constructor(private userData:UsersService)
  {
    userData.users().subscribe((data)=>{
      console.log('data',data);
      this.users = data;
    })
  }
}
