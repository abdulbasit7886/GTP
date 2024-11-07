import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  submitform(formData: any){
   localStorage.setItem('userdata', JSON.stringify(formData));
   console.log("signup form data", formData)
  }
}
