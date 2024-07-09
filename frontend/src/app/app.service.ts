import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`http://localhost:3000/users/${username}`, { withCredentials: true });
  }
  
  createUser(firstName: string, lastName: string, username: string, password: string): Observable<any> {
    const body = { firstName, lastName, username, password};
    console.log(body);
    return this.http.post('http://localhost:3000/users/register', body, { headers: this.headers, withCredentials: true });
  }

  getPostById(postId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/posts/${postId}`, { withCredentials: true });
  }

  getPosts(): Observable<any> {
    return this.http.get('http://localhost:3000/posts/', { withCredentials: true });
  }

  getComments(postId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/comments?postId=${postId}`, { withCredentials: true });
  }

  likePost(postId: string, username: string): Observable<any> {
    return this.http.patch(`http://localhost:3000/posts/${postId}/likes`, { username }, { withCredentials: true });
  }

  followUser(usernameToBeFollowed: string, username: string): Observable<any> {
    return this.http.patch(`http://localhost:3000/users/${usernameToBeFollowed}/follow`, { username }, { withCredentials: true });
  }

  createPost(author: string, title: string, description: string): Observable<any> {
    const body = { author, title, description };
    return this.http.post('http://localhost:3000/posts', body, { headers: this.headers, withCredentials: true });
  }

  createComment(username: string, postId: string, content: string): Observable<any> {
    const body = { username, post_id: postId, content };
    return this.http.post('http://localhost:3000/comments', body, { headers: this.headers, withCredentials: true });
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/comments/${commentId}`, { withCredentials: true });
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/posts?id=${postId}`, { withCredentials: true });
  }

  updateComment(commentId: string, content: string): Observable<any> {
    return this.http.patch(`http://localhost:3000/comments/${commentId}`, { content }, { withCredentials: true });
  }

  updatePost(postId: string, content: string): Observable<any> {
    return this.http.patch(`http://localhost:3000/posts/${postId}`, { content }, { withCredentials: true });
  }

  getPostsByAuthor(author: string): Observable<any> {
    return this.http.get(`http://localhost:3000/posts/author/${author}`, { withCredentials: true });
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post('http://localhost:3000/users/login', body, { headers: this.headers, withCredentials: true });
  }

  searchUser(username: string): Observable<any> {
    return this.http.get(`http://localhost:3000/users/${username}/search`, { withCredentials: true });
  }
}
