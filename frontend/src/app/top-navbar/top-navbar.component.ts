import { Component } from '@angular/core';
import { first } from 'rxjs';
import { AppService } from '../app.service'; // Adjust the import path based on your actual service location

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  firstName = localStorage.getItem('firstName'); // Replace with your actual logic
  username = localStorage.getItem('username'); // Replace with your actual logic
  userAvatarUrl = 'https://aui.atlassian.com/aui/9.1/docs/images/avatar-person.svg';
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
      this.showDropdown = false; // Hide dropdown when search input is empty
    }
  }
  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); // Delay to allow click event to register
  }

  onSelectUser(user: any) {
    // Navigate to the user's profile or handle user selection
    console.log('Selected user:', user);
  }
}
