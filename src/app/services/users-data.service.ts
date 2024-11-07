import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  url = "https://fakestoreapi.com/users"
  constructor(private http:HttpClient) { }
  userdata(){
    return this.http.get(this.url);
   
  }
}
