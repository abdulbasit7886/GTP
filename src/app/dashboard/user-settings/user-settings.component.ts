import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  name: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  // Fetch the current user's profile to prefill the name field
  fetchUserProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get('http://localhost:4000/profile', {
        headers: { Authorization: token }
      }).subscribe(
        (res: any) => {
          this.name = res.name; // Pre-fill the name field
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Unauthorized');
    }
  }

  // Update the user's profile (name and/or password)
  updateProfile(): void {
    const token = localStorage.getItem('token');  // Get the token from localStorage
    if (!this.name.trim() || (this.password && this.password !== this.confirmPassword)) {
      alert('Please ensure all fields are valid.');
      return;
    }

    const updateData: any = { name: this.name };
    if (this.password) {
      updateData.password = this.password;
    }

    if (token) {
      const userId = this.getLoggedInUserId(); // Retrieve the logged-in user's ID from the JWT
      this.http.patch(`http://localhost:4000/user/update-profile/${userId}`, updateData, {
        headers: { Authorization: token }
      }).subscribe(
        (res: any) => {
          alert('Profile updated successfully.');
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Unauthorized');
    }
  }

  // Method to get the logged-in user's ID (from the JWT token)
  getLoggedInUserId(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Decode JWT token
      return decodedToken.userId;  // Assuming the userId is in the payload
    }
    return '';
  }

  // Delete the user's account
// Delete the user's account with confirmation
deleteAccount(): void {
  const confirmation = confirm('Do you really want to delete your account? This action cannot be undone.');
  if (!confirmation) {
    return; // If the user cancels, exit the method
  }

  const token = localStorage.getItem('token');
  const userId = this.getLoggedInUserId(); // Get the logged-in user's ID from the token

  if (token && userId) {
    this.http.delete(`http://localhost:4000/user/delete-profile/${userId}`, {
      headers: { Authorization: token }
    }).subscribe(
      (res: any) => {
        alert('User deleted successfully.');
        // Log the user out and redirect to login page
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
      },
      (error) => {
        alert(error.error.message);
      }
    );
  } else {
    alert('Unauthorized');
  }
}

}
