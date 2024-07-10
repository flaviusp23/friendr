import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent {
  @Input() user: any;
  userAvatarUrl = '';

  constructor(private appService : AppService){}

  ngOnInit(){
    this.appService
      .getUserByUsername(this.user.username)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.userAvatarUrl = response.pictureUrl;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
