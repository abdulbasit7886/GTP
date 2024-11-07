import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-user-info',
  templateUrl: './display-user-info.component.html',
  styleUrls: ['./display-user-info.component.css']
})
export class DisplayUserInfoComponent implements OnInit {
 userData: any;
 ngOnInit(){
  const getuserData = localStorage.getItem('userdata');
  if(getuserData){
    this.userData = JSON.parse(getuserData);
  }
  else{
    console.warn("No data found in storage")
  }
   
 }

}
