import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  isFollowingUser: boolean = false;
  userAvatarUrl = 'https://aui.atlassian.com/aui/9.1/docs/images/avatar-person.svg';
  comments = [];

  isEditing = false;
  editedDescription: string = '';

  @Input() postInput: any;
  @Output() postDeleted = new EventEmitter<void>();

  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.checkIfFollowing();
    this.getComments();
  }

  isMyPost(): boolean {
    return this.username === this.postInput.author;
  }
  doILike(): boolean{
    return this.postInput.likes.includes(this.username);
  }
  checkIfFollowing() {
    const author = this.postInput?.author || localStorage.getItem('author') || '';
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

  getTimeAgo(postDate: string | Date): string {
    const currentDate = new Date();
    const postDateObj = new Date(postDate);
    
    const timeDifference = currentDate.getTime() - postDateObj.getTime();
    
    const secondsAgo = Math.floor(timeDifference / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    
    let timeAgo;
    if (daysAgo > 0) {
      timeAgo = daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      timeAgo = hoursAgo === 1 ? `${hoursAgo} hour ago` : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      timeAgo = minutesAgo === 1 ? `${minutesAgo} minute ago` : `${minutesAgo} minutes ago`;
    } else {
      timeAgo = secondsAgo === 1 ? `${secondsAgo+1} second ago` : `${secondsAgo+1} seconds ago`;
    }
    
    return timeAgo;
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
    const author = this.postInput?.author || localStorage.getItem('author') || '';
    this.appService
      .followUser(author, this.username)
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log(this.isFollowingUser ? "User unfollowed" : "User followed");
          this.isFollowingUser = !this.isFollowingUser;
          this.postDeleted.emit();
        },
        error: (error) => {
          alert("Error. Please try again")
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

  deletePost(event: Event): void {
    event.stopPropagation(); // Prevents click event from propagating
    const postId = this.postInput.id || localStorage.getItem('postId') || '';
    this.appService
    .deletePost(postId)
    .pipe(first())
    .subscribe({
      next: (response) => {
        console.log("Post Deleted");
        this.postDeleted.emit();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  startEditing(): void {
    this.isEditing = true;
    this.editedDescription = this.postInput.description;
  }

  saveEdit(): void {
    if (this.editedDescription.trim() !== '') {
      this.appService
        .updatePost(this.postInput.id, this.editedDescription)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log('Post updated');
            this.postInput.description = this.editedDescription;
            this.isEditing = false;
            this.postDeleted.emit();
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedDescription = '';
  }
  copyLink() {
    const postUrl = `${window.location.origin}/posts/${this.postInput.id}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      alert('Post link copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}
