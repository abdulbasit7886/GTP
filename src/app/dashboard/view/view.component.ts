import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent  implements OnInit{
 Posts: any [] = [];
 constructor(private http: HttpClient){}
 ngOnInit() : void{
  this.fetchPosts();
 }
 fetchPosts(): void{
  this.http.get<any>('https://localhost:3001/posts').subscribe(
    (data)=>
    {
      this.Posts = data.posts;
      console.log("fetched posts:" , this.Posts);
      
    },
    (error) =>{
      console.error("Error fetching posts:", error);
    
});
 }
}
