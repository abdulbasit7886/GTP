import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent {
  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  signup(){
    console.log(this.signUpForm.value);
    alert(`${this.signUpForm.value.name} form submitted successfully with reactive form method`)
    this.signUpForm.reset(); 
  }
}
