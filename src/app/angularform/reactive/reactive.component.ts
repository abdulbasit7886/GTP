// app/angularform/reactive/reactive.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent {
  reactiveForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private router: Router) {}

  submitData() {
    if (this.reactiveForm.valid) {
      const formData = this.reactiveForm.value;
      sessionStorage.setItem('formData', JSON.stringify(formData));
      this.router.navigate(['/view']);
    }
  }
}
