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
  userAvatarUrl =
    'https://aui.atlassian.com/aui/9.1/docs/images/avatar-person.svg';

  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  @Input() postInput: any;

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

  redirectToPost(postId: string) {
    this.router.navigate(['/posts', postId]);
    localStorage.setItem('postId', postId);
  }
}
