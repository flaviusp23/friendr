import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit {
  username = localStorage.getItem('username') || '';
  postId : string = '';
  post: any = {}; // This will hold the post data
  comments: any = [];
  content: string = '';

  constructor(private route:ActivatedRoute, private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('postId') || '';
      this.getPost();
      this.getComments();
    });
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
          this.content = ''; // Clear the input field
          this.refreshComments();
          this.getPost();
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
  refreshPost(): void {
    this.getPost();
  }
}
