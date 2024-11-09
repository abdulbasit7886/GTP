import { Component } from '@angular/core';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.css']
})
export class DataviewComponent {
  users: any[]=[];
  constructor(){}
  ngOnInit() {
    this.fetchData()
  }
fetchData(){
  fetch('https://jsonplaceholder.typicode.com/users',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res)=>  res.json())
  .then((data)=>{
    return this.users=data
  })
  .catch(err=>{
    console.error(err);
    return err.message;
  })
}
}