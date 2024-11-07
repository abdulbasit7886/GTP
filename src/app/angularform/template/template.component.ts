import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  constructor(private router:Router){}
  userSignUp(signUpForm: NgForm) {
    let data=signUpForm.value
    console.log(data)
    signUpForm.reset()
    alert(` ${data.name} profile created successfully`)
  }

}
