import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  password: string = '';
  confirmpassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private appService: AppService) {}

  registerUser(): void {
    this.errorMessage = '';

    if (!this.firstname || !this.lastname || !this.username || !this.password || !this.confirmpassword) {
      this.errorMessage = 'All fields are required';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }
    if (this.password !== this.confirmpassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.appService.getUserByUsername(this.username).subscribe({
      next: (user) => {
        if (user) {
          this.errorMessage = 'Username already exists. Please choose a different username.';
        } else {
          this.createUser();
        }
      },
      error: (error) => {
        if (error.status === 404) {
          // Username does not exist, proceed with registration
          this.createUser();
        } else {
          console.error('Error checking username:', error);
          this.errorMessage = "Failed to check username. Please try again.";
        }
      }
    });
  }

  private createUser(): void {
    this.appService.createUser(
      this.firstname,
      this.lastname,
      this.username,
      this.password
    ).subscribe({
      next: (response) => {
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.errorMessage = "Registration failed. Please try again.";
      }
    });
  }
}
