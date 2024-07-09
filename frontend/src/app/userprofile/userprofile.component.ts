import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent {
  @Input() user: any;
  userAvatarUrl = 'https://aui.atlassian.com/aui/9.1/docs/images/avatar-person.svg';
}
