import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  getUserByUsername(username : string): Observable<any>{
    return this.http.get(`http://localhost:3000/users/${username}`);
  }
  getPostById(postId : string):Observable<any>{
    return this.http.get(`http://localhost:3000/posts/${postId}`)
  }
  getPosts(): Observable<any>{
    return this.http.get('http://localhost:3000/posts/')
  }
  getComments(postId: string): Observable<any>{
    return this.http.get(`http://localhost:3000/comments?postId=${postId}`)
  }
  likePost(postId: string, username: string): Observable<any> {
    return this.http.patch(`http://localhost:3000/posts/${postId}/likes`, { username });
  }
  followUser(usernameToBeFollowed: string, username: string): Observable<any> {
    return this.http.patch(`http://localhost:3000/users/${usernameToBeFollowed}/follow`, { username });
  }
  createPost(author: string, title: string, description: string){
    const body = {
      author: author,
      title: title,
      description: description
    };
    console.log(body)
    return this.http.post('http://localhost:3000/posts', body);
  }

}
