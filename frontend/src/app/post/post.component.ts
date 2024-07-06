import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  username = localStorage.getItem('username') || '';
  isFollowingUser: boolean = false; // Property to store following state
  userAvatarUrl =
    'https://aui.atlassian.com/aui/9.1/docs/images/avatar-person.svg';
  comments = []

  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  @Input() postInput: any;

  ngOnInit() {
    this.checkIfFollowing();
    this.getComments();
  }

  checkIfFollowing() {
    const author = this.postInput?.author || localStorage.getItem('author') || ''
    this.appService
      .getUserByUsername(author)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.isFollowingUser = response.followers.includes(this.username);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  onLike() {
    this.appService
      .likePost(this.postInput.id, this.username)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.postInput.likes = response.likes;
          this.postInput.likeCount = response.likeCount;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  follow() {
    const action = this.isFollowingUser ? 'unfollowUser' : 'followUser';
    const author = this.postInput?.author || localStorage.getItem('author') || ''
    this.appService
      .followUser(author, this.username)
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log(this.isFollowingUser ? "User unfollowed" : "User followed");
          this.isFollowingUser = !this.isFollowingUser;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  redirectToPost(postId: string) {
    this.router.navigate(['/posts', postId]);
    localStorage.setItem('postId', postId);
    localStorage.setItem('author', this.postInput.author);
  }

  getComments(): void {
    const postId = this.postInput.id || localStorage.getItem('postId') || '';
    this.appService.getComments(postId).pipe(first()).subscribe({
      next: (response) => {
        this.comments = response;
        this.postInput.commentCount = response.length;
        console.log(this.comments);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
