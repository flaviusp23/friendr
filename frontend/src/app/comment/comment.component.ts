import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  username = localStorage.getItem('username');
  userAvatarUrl =
    'https://aui.atlassian.com/aui/9.1/docs/images/avatar-person.svg';
    
  @Input() commentInput: any;
  @Output() commentDeleted = new EventEmitter<void>();


  isEditing = false;
  editedContent: string = '';

  constructor(private appService: AppService) {}

  isMyComment(): boolean {
    return this.username === this.commentInput.username;
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

  deleteComment(): void {
    this.appService.deleteComment(this.commentInput.id)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Comment deleted");
          this.commentDeleted.emit();
   
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  startEditing(): void {
    this.isEditing = true;
    this.editedContent = this.commentInput.content;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedContent = '';
  }

  saveEdit(): void {
    if (this.editedContent.trim() !== '') {
      this.appService
        .updateComment(this.commentInput.id, this.editedContent)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log("Comment updated");
            this.commentInput.content = this.editedContent;
            this.isEditing = false;
            this.commentDeleted.emit();
       
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }
}