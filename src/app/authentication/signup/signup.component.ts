import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router) {} // Inject Router
 
  userSignUp(signUpForm: any){
    
    console.log(signUpForm.value)
    let singupdata = localStorage.setItem("user", JSON.stringify(signUpForm.value))
   

    alert("user register successfully")
    this.router.navigate(['/login'])
  }

}
