import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnInit {
  @Input() postInput: any;

  likePost(){
    console.log(`You liked post with title ${this.postInput.title}`)
  }
  ngOnInit(): void {
    console.log(this.postInput);
  }
}
