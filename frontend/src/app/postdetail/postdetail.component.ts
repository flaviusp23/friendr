import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from '../app.service';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit {
  username = localStorage.getItem('username') || '';
  postId = localStorage.getItem('postId') || '';
  userAvatarUrl = 'https://aui.atlassian.com/aui/9.1/docs/images/avatar-person.svg';
  post: any = {}; // This will hold the post data
  comments: any = [];
  constructor(private appService: AppService) {
    console.log(this.postId)
    this.appService
    .getComments(this.postId)
    .pipe(first())
    .subscribe({
      next:(response) => {
        console.log(response);
        this.comments = response;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  ngOnInit() {
    this.fetchPostDetails();
  }

  fetchPostDetails() {
    this.appService.getPostById(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        console.log('Post Details:', this.post);
      },
      error: (error) => {
        console.log('Error fetching post details:', error);
      }
    });
  }

  onLike() {
    this.appService.likePost(this.postId, this.username).pipe(first()).subscribe({
      next: (response) => {
        this.post.likes = response.likes;
        this.post.likeCount = response.likeCount;
        console.log('Updated Post:', this.post);
      },
      error: (error) => {
        console.log('Error liking post:', error);
      }
    });
  }
}