import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  posts: any = [];

  constructor(private route: ActivatedRoute, private appService: AppService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.refreshPosts(); // Fetch posts when username changes
    });
  }

  refreshPosts(): void {
    if (this.username) { // Ensure username is not empty
      this.appService
        .getPostsByAuthor(this.username)
        .pipe(first())
        .subscribe({
          next: (response) => {
            this.posts = response;
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }
}
