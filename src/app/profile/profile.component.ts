import { Component, Input } from '@angular/core';
import { GitHubUser } from '../githubuser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    @Input() gitHubUser: GitHubUser;

  constructor() 
  {}
}
