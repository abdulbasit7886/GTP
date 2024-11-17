import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
private apiUrl = "http://localhost:3000/api/user";

  constructor(private http:HttpClient) { }

  private getheaders(): HttpHeaders{
    const token = localStorage.getItem('token') || '';
    console.log('Token:', token);
    return new HttpHeaders({
      token: token
    });
  }

  getUserData(): Observable<any> {
    return this.http.get(this.apiUrl, {headers: this.getheaders()});
  }

  updateUserData(updateUser: { email: string; }): Observable<any>{
    return this.http.put(this.apiUrl, updateUser, {headers: this.getheaders()});
  }
}
