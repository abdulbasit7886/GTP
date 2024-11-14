import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  async onUpdateUser() {
    const userId = 'yourUserId'; // Replace with the actual user ID
    const formData = this.userForm.value;

    try {
      const response = await fetch(`http://localhost:3001/updateuser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const result = await response.json();
      console.log('User updated:', result);
      alert(result.message);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
  }

  
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
  
 
}
