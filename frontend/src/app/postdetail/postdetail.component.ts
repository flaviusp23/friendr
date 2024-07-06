import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit {
  username = localStorage.getItem('username') || '';
  postId = localStorage.getItem('postId') || '';
  post: any = {}; // This will hold the post data
  comments: any = [];
  content: string = '';

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    this.getPost();
    this.getComments();
  }

  getPost(): void {
    this.appService.getPostById(this.postId).pipe(first()).subscribe({
      next: (response) => {
        this.post = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  createComment(): void {
    this.appService.createComment(this.username, this.postId, this.content)
      .pipe(first())
      .subscribe({
        next: () => {
          this.refreshComments();
          this.content = ''; // Clear the input field
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  refreshComments(): void {
    this.getComments();
  }

  getComments(): void {
    this.appService.getComments(this.postId).pipe(first()).subscribe({
      next: (response) => {
        this.comments = response;
        this.post.commentCount = response.length; // Update the comment count
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
