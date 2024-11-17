import { Component } from '@angular/core';
import {SignupService} from '../services/signup.service'
import {NgForm} from '@angular/forms'
import{Router} from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
constructor(private signupService: SignupService,
  private router: Router
){}
 
  backenderr_msg: string = '';
  backendSucc_msg: string = '';

  submitted = false;

  inputfieldsCheck(submitForm: NgForm){
    this.submitted = true;
    if(submitForm.invalid){
      return;
    }
    }

  submitform(formData: {username: string; email: string; password: string}, submitForm: NgForm){
     
     const trimmedUsername = formData.username.trim();
     const trimmedEmail = formData.email.trim();
     const trimmedPassword = formData.password.trim();

     if(!trimmedUsername || !trimmedEmail || !trimmedPassword){
      this.backenderr_msg = 'Fields are required, cannot contain only spaces';
      this.backendSucc_msg = "";
      return;
     }


     if(formData.email){
      formData.email = formData.email.toLowerCase();
     }

    this.signupService.signupUser(formData).subscribe(
      {
      next: (res) =>{
        console.log('User signed up successfully',res);
        this.backendSucc_msg = res.message;
        this.backenderr_msg= '';

        submitForm.reset();

        this.router.navigate(['/login'])
      },
      error: (error) =>{
        this.backenderr_msg = error.error?.message || 'Error during sign-up';
       },
       complete: () => {
        console.log('Sign-up request completed');
      }
    });

 
  

  }
}
    
  

