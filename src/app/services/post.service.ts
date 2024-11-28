import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';
  private friendRequestUrl = 'http://localhost:3000/api/follow';
  private acceptFollowUrl = 'http://localhost:3000/api/acceptfollow';
  private rejectFollowUrl = 'http://localhost:3000/api/rejectfollow';
  private getRequestsUrl = 'http://localhost:3000/api/getrequest';
  private getfriendlistUrl = 'http://localhost:3000/api/friendlist';
  private delfriendUrl = 'http://localhost:3000/api/removefriend';
  private mutualfriendUrl = 'http://localhost:3000/api//mutual-friends';


  constructor(private http: HttpClient) { }

  

  private getheaders(): HttpHeaders{
    const token = localStorage.getItem('token') || '';
    console.log('Token:', token);
    return new HttpHeaders({
      token: token
    });
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }

  createPost(postData: FormData): Observable<any> {
   return this.http.post(this.apiUrl, postData,{headers: this.getheaders()});
  }

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl, {headers: this.getheaders()});
  }

  updatePost(postId: string, postData: FormData ): Observable<any>{
    return this.http.put(`${this.apiUrl}/${postId}`, postData, {headers: this.getheaders()});
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${postId}`, {headers: this.getheaders()});
  }

  getotherPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/other`, {headers: this.getheaders()});
  }

  // New method to send friend request (follow)
  sendFriendRequest(username: string): Observable<any> {
    if (!username || username.trim() === '') {
      console.error('Invalid username. Cannot send friend request.');
      return throwError(() => new Error('Invalid username'));
    }
  
    const body = { username };
    return this.http.post(this.friendRequestUrl, body, { headers: this.getheaders() })
    .pipe(catchError(this.handleError));
  }

   

  // Method to accept a follow request
  acceptFollowRequest(requestId: string, senderUsername: string): Observable<any> {
    if (!requestId || !senderUsername) {
      console.error('Both Request ID and Sender Username are required');
      return throwError(() => new Error('Both Request ID and Sender Username are required'));
    }

    // Validate if the requestId is a valid MongoDB ObjectId
    if (!this.isValidObjectId(requestId)) {
      console.error('Invalid requestId format:', requestId);
      return throwError(() => new Error('Invalid Request ID'));
    }

    // Proceed with the HTTP POST request
    return this.http.post(this.acceptFollowUrl, { requestId, senderUsername }, { headers: this.getheaders() })
      .pipe(catchError(this.handleError));
  }

  // Helper function to validate MongoDB ObjectId
  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id); // MongoDB ObjectId is a 24-character hex string
  }


  getFriendRequests(): Observable<any> {
    return this.http.get(this.getRequestsUrl, { headers: this.getheaders() });
  }

  rejectFollowRequest(requestId: string): Observable<any> {
    const body = { requestId };
    return this.http.post(this.rejectFollowUrl,body,  { headers: this.getheaders() });
  }

  getFriendList(): Observable<any>{
    return this.http.get(this.getfriendlistUrl,{ headers: this.getheaders()})
  }

  removeFriend(friendUsername: string): Observable<any> {
    return this.http.delete(this.delfriendUrl, { 
      body: { friendUsername }, // Send friendUsername as part of the request body
      headers: this.getheaders() 
    });
  }

  getMutualFriends(username: string): Observable<any> {
    const url = `${this.mutualfriendUrl}/${username}`; // Dynamically add username
    return this.http.get(url, { headers: this.getheaders() });
  }



// Reshare a post
repost(postId: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/reshare`, { postId }, { headers: this.getheaders() });
}

}
