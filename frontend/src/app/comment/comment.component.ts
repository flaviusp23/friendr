import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  constructor(private appService: AppService){}

  @Input() commentInput: any;
  
}
