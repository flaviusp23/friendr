import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = ''; // sau aceeasi chestie cu username! : string
  constructor(private router: Router, private appService:AppService){
    const username = localStorage.getItem('username');// ngOnInit se apeleaza dupa constructor
    if(username)
        this.username = username;
  }
  signIn(){
    this.appService.getUserByUsername(this.username).subscribe({
      next: (response) => {
        localStorage.setItem('username',this.username);
        localStorage.setItem('firstName',response?.firstName);
        localStorage.setItem('lastName',response?.lastName);
        this.router.navigate(['homepage']);
      },
      error:(error) => {}
    });
  }
}
