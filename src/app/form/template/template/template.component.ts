import { Component } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  userLogin(item:any){
    console.log(item);
    alert("Templete User Login Successfully")
    
  }

}
