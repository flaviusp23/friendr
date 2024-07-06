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

  constructor(private appService: AppService) {}

  isMyComment(): boolean {
    return this.username === this.commentInput.username;
  }

  deleteComment(): void {
    this.appService.deleteComment(this.commentInput.id)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Comment deleted");
          this.commentDeleted.emit(); // Emit event when comment is deleted
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
