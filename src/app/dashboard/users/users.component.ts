import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers()
  }


  fetchUsers() {
    const token = localStorage.getItem('token'); // Retrieve token
  
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get('http://localhost:5000/api/auth/allUsers', { headers }).subscribe(
        (response: any) => {
          this.users = response.users; // Use the correct property from API response
          console.log(this.users);
        },
        (error) => {
          console.error('Error fetching users:', error);
          console.log('Possible Causes:');
          console.log('1. Backend server is not running.');
          console.log('2. Incorrect API URL or port mismatch.');
          console.log('3. Token might be invalid or expired.');
          console.log('4. CORS issues on the backend.');
        }
      );
    } else {
      console.warn('No token found in local storage');
    }
  }
  followUser(index: number) {
    this.users[index].followed = true; // Mark user as followed
  }
  


}
