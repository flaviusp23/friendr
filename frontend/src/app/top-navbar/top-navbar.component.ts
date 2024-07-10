import { Component } from '@angular/core';
import { first } from 'rxjs';
import { AppService } from '../app.service'; 

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  firstName = localStorage.getItem('firstName'); 
  username = localStorage.getItem('username'); 
  userAvatarUrl = localStorage.getItem('pictureUrl'); 
  showDropdown = false;
  searchResults: any[] = [];

  constructor(private appService: AppService) {}

  searchUsers(event: Event) {
    const target = event.target as HTMLInputElement;
    const username = target.value;
  
    if (username.trim() !== '') {
      console.log(username);
      this.appService
        .searchUser(username)
        .pipe(first())
        .subscribe({
          next: (response) => {
            this.searchResults = response;
            this.showDropdown = true;
          },
          error: (error) => {
            console.log(error);
          }
        });
    } else {
      this.searchResults = [];
      this.showDropdown = false;
    }
  }
  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); 
  }
}
