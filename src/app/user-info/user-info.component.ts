import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../services/user-info.service';
import {Router} from '@angular/router'

interface User {
  username: string;
  email: string;
}

interface NewUser {
  email: string;
  password?: string; 
}
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User={username: '', email: ''};
  newUser: NewUser ={ email: ''};
  message: string = '';

  constructor(private userInfoService: UserInfoService, private router: Router) {}


  ngOnInit(){
    this.fetchUserData();
    }
    fetchUserData(){
   this.userInfoService.getUserData().subscribe(
     (res: any) =>{
       this.user = res;
       this.newUser = {...this.user};  // Initialize newUser with the current data
     }
   )
   }
   
   updateUserData(){
     this.userInfoService.updateUserData(this.newUser).subscribe(
       (res: any) =>{
         this.user = res;
         this.message = 'User data updated successfully!';
       }
     )
   }

   logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
