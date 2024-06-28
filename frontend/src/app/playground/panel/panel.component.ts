import { Component } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  posts: any[] = [
    {
      id: 1,
      userid: 10,
      date: "Fri Jun 28 2024 11:46:01 GMT+0300 (Eastern European Summer Time)",
      title: "Post 1",
      description: "This is my first post"
    },
    {
      id: 2,
      userid: 10,
      date: "Fri Jun 28 2024 11:46:01 GMT+0300 (Eastern European Summer Time)",
      title: "Post 2",
      description: "This is my second post"
    },
    {
      id: 3,
      userid: 10,
      date: "Fri Jun 28 2024 11:46:01 GMT+0300 (Eastern European Summer Time)",
      title: "Post 3",
      description: "This is my third post"
    }
  ];
  title: string = '';
  description: string = '';

  createPost() {
    const newPost = {
      id: this.posts.length + 1,
      userid: 10,
      date: new Date().toString(),
      title: this.title,
      description: this.description
    };

    this.posts.push(newPost);
  }
}
