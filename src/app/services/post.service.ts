import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  private getheaders(): HttpHeaders{
    const token = localStorage.getItem('token') || '';
    console.log('Token:', token);
    return new HttpHeaders({
      token: token
    });
  }


  createPost(postData: { title: string, description: string }): Observable<any> {
   return this.http.post(this.apiUrl, postData,{headers: this.getheaders()});
  }

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl, {headers: this.getheaders()});
  }

  updatePost(postId: string, postData: { title: string, description: string }): Observable<any>{
    return this.http.put(`${this.apiUrl}/${postId}`, postData, {headers: this.getheaders()});
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${postId}`, {headers: this.getheaders()});
  }

  getotherPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/other`, {headers: this.getheaders()});
  }
}
