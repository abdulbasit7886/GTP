import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  userForm: any = FormGroup;
  user:any = {};
  userId!:string;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) {}
  ngOnInit(): void {
    this.checktoken();
  this.route.queryParams.subscribe(params => {
   this.userId=params['userId']
   console.log(this.userId)
   });
  }
  async checktoken(){
    const token = localStorage.getItem('authToken')
    if(!token){
      this.router.navigate(['/login'])
    }
  }
  userInfo():void {
    const token = localStorage.getItem('token');
    console.log(token)
    {
      this.http.get(`http://localhost:3001/getupdateUser/${this.userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        },
      }).subscribe(
        (response) => {
          console.log('user found:', response);
          this.router.navigate(['/userinfo']); 
        },
        (error) => {
          console.error('Error finding user:', error);
        }
    );
}
}
logout() {
  localStorage.removeItem('authToken')
  this.router.navigate(['/login'])
}
}


  // async onUpdateUser() {

  //   const userId = this.userId;
  //   const formData = this.userForm.value;

  //   const token = localStorage.getItem('authToken');
  //   if (!token) {
  //     this.router.navigate(['/login'])
  //   }
  //     this.http.put(`http://localhost:3001/updateUser/${userId}`,formData ,{
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).subscribe(
  //       (response) => {
  //         console.log('Post updated successfully:', response);
  //         this.router.navigate(['/dashboard']); 
  //       },
  //       (error) => {
  //         console.error('Error updating post:', error);
  //       }
  //     );

     
  // }



  // async onUpdateUser() {
    
  //   const userId = this.userId;
  //   const formData = this.userForm.value;

  //   try {
  //     const response = await fetch(`http://localhost:3001/updateUser/${userId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update user');
  //     }

  //     const result = await response.json();
  //     console.log('User updated:', result);
  //     alert(result.message);
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //     alert('Failed to update user.');
  //   }
  // }


  // async userdetails() {
  //   const token = localStorage.getItem('authToken');
  //   console.log(token);
  //   let userId: string | null = null;
  // if (token) {
  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     console.log("Decoded Payload:", payload); 
  //     userId = payload.userId || null; 
  //   } catch (error) {
  //     console.error('Invalid token:', error);
  //     return;
  //   }
  // }
  //   if (!userId) {
  //     console.error('User ID not found in token.');
  //     return;
  //   }
  //   try {
  //     const response = await fetch(`http://localhost:3001/getupdateuser/{$userId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'token': token || ''
  //       },
  //     });
  //     const data = await response.json()
  //     this.user = data
  //   }
  //   catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // }

