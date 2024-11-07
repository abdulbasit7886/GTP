import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user = { name: '', email: '' }; // For template-driven form
  reactiveForm: FormGroup; // For reactive form
  submittedData = { name: '', email: '' }; // To store submitted data

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  // Handle template-driven form submission
  onTemplateFormSubmit(form: any) {
    if (form.valid) {
      this.submittedData = { ...this.user };
    }
  }

  // Handle reactive form submission
  onReactiveFormSubmit() {
    if (this.reactiveForm.valid) {
      this.submittedData = { ...this.reactiveForm.value };
    }
  }
}
