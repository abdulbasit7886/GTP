import { Component } from '@angular/core';

@Component({
  selector: 'app-templatedriven-form',
  templateUrl: './templatedriven-form.component.html',
  styleUrls: ['./templatedriven-form.component.css']
})
export class TemplatedrivenFormComponent {
  submitData: any = null;
  submitform(data: any){
    this.submitData = data;
    console.warn(this.submitData)
  }
}
