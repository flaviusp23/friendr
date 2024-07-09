import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Method to check if the user is not on login, register, or home page
  shouldShowNavbar(): boolean {
    const path = document.location.pathname;
    return !(path === '/login' || path === '/register' || path === '/');
  }
}
