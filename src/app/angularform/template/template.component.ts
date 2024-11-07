import { Component } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  signUpData = {
    username: '',
    email: '',
    password: ''
  };

  onSubmit(): void {
    console.log('Form Submitted', this.signUpData);
    alert('Form Submitted')
  }
}
