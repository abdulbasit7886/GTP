import { Component } from '@angular/core';
import { FormControl,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent {
  signUpForm!: FormGroup;
  constructor() { }
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit(): void {
    console.log('Form Submitted', this.signUpForm.value);
    this.signUpForm.reset();
  }
}
