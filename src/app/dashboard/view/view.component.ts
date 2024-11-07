import { Component } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  posts: any[]=[];
  constructor(){}
  ngOnInit() {
    this.fetchData()
  }
fetchData(){
  fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res)=>  res.json())
  .then((data)=>{
    return this.posts=data
  })
  .catch(err=>{
    console.error(err);
    return err.message;
  })
}
}
