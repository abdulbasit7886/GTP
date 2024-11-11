import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent {
  loginForm = new FormGroup({
    email : new FormControl(""),
    password : new FormControl(""),

  })
  loginUser(){
    console.log(this.loginForm.value);
    alert("Reactive User Login")
    
  }

}
