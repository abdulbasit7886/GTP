import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router:Router){}

  async userSignUp(signUpForm: NgForm){
  if(signUpForm.valid){
try{
  const response = await fetch ('http://localhost:3001/signup',{
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(signUpForm.value)
    });
    if(response.ok){
      alert("User registered successfully");
      this.router.navigate(['/login']);
    }
    else{
      alert("Registration failed. please try again.")
    }
}
catch(error){
  alert("An error occurred while trying to register. Please try again");
  console.error("Error:", error)
}

  }
    else{
      alert("Please fill in all required fields.")
    }
    
  }

}
