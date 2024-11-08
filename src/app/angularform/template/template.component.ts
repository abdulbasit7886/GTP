// app/angularform/template/template.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  name: string = '';
  email: string = '';

  constructor(private router: Router) {}

  submitData(form: any) {
    if (form.valid) {
      const formData = { name: this.name, email: this.email };
      sessionStorage.setItem('formData', JSON.stringify(formData));
      this.router.navigate(['/view']);
    }
  }
}
