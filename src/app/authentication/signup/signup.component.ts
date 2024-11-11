import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router,) { }
  async userSignUp(signUpForm: NgForm) {
    let data = signUpForm.value
    console.log('here')
    if (!data.email) {
      alert('Please enter email')
      return
    } else if (!data.password) {
      alert('Please enter password')
      return
    }
    else if (!data.name) {
      alert('Please enter name')
      return
    }
    console.log(data)
    console.log('there')
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        const res= await response.json()
        console.log('res')
        throw new Error(res.message)
      }else{
        const data = await response.json()
        alert(data.message)
        signUpForm.reset()
        this.router.navigate(['/login'])
      }
    }
    catch (error) {
      console.error('An error occurred:', error);
      alert(error)
      return
    }
  }

}
