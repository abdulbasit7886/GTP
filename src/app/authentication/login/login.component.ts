import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router){}
 async userLogin(loginForm: NgForm){
   if(loginForm.valid){
    const user = loginForm.value;
   

   try{
    const response = await fetch('http://localhost:3001/login', {
      method: 'post',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(user)
    });

    if(response.ok){
      const data = await response.json();
      if(data.token){
      localStorage.setItem('authToken', data.token);
      alert("Login Successfull!");
      this.router.navigate(['/dashboard']);
    }
    else{
      alert("Login failed. Token not received.")
    }
   }
   else{
    alert("Invalid email or password")
   }
    
  }
  catch(error){
    alert("an error occurred while trying to log in. please try again")

      console.error("Error", error);
      
  }

  }else{
    alert("Pleasr fill in all required fields.")
  }
}
}