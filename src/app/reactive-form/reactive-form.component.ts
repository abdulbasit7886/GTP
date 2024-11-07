import { Component } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms'
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  submitForm = new FormGroup({ 
    username: new FormControl(''), 
    email: new FormControl(''),
    password: new FormControl('')
  })
   
  submitData:any = null;
  submitform(){
    this.submitData=this.submitForm.value
    console.warn(this.submitData);
  }
}
