import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrl: './createpost.component.scss'
})
export class CreatepostComponent {
  author = localStorage.getItem('username') || '';
  title = ''
  description = ''
  constructor(private router: Router,private appService : AppService){}

  createPost(){
    this.appService
    .createPost(this.author,this.title,this.description)
    .pipe(first())
    .subscribe({
      next:(response)=>{
        this.router.navigate(['homepage']);
        alert('Post have been created')

      },
      error:(error) => {
        alert('Post could not be created')
        console.log(error)
      }
    })
  }
}
