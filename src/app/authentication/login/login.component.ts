import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router){}
  userLogin(loginData: any){
   
  let user = loginData.value
 
 
  const storedData = localStorage.getItem('user');
  console.log(storedData)

  if(storedData){
    const parseData = JSON.parse(storedData)

    if(user.email === parseData.email && user.password === parseData.password){
      alert("login")
      this.router.navigate(['/dashboard'])
    }else{
      alert("invalid email or password")
    }
     
  }
  
    
  }
}
