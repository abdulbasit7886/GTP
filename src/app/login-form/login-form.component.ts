import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginUser(loginData: any){

    const getuserData = localStorage.getItem('userdata');
    if(getuserData){
      const userdata = JSON.parse(getuserData);

      if(loginData.email === userdata.email && loginData.password === userdata.password){
        console.warn("login successfully");
        alert("login successfully");
      }
      else{
        console.warn("Invalid Email or Password");
        alert("Invalid Email or Password");
      }
    }
    else{
      console.warn("user data not found");
        alert("user data not found");
    }
  }
}
