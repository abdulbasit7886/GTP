import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiurl = 'http://localhost:3000/api/signup';
  constructor(private http: HttpClient) { }

  signupUser(userData: {username: string; email: string; password: string}): Observable<any> {

    return this.http.post(this.apiurl, userData);
  }
}
