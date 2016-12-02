import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitHubService } from '../github.service';
import 'rxjs/add/operator/map';

import { GitHubUser } from '../GitHubUser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() gitHubUser: GitHubUser;
  @Output() userUpdated: EventEmitter<GitHubUser> = new EventEmitter<GitHubUser>();
  constructor(private gitHubService: GitHubService) { }
  ngOnInit() {
    if (this.gitHubUser){
      this.gitHubUser.user = false;
      this.fetchUserInformation();
    }
  }
  searchUser() {
    if (this.gitHubUser.userName && this.gitHubUser.userName.length > 0){
        this.gitHubService.updateUser(this.gitHubUser.userName);
        this.fetchUserInformation();
    } else {
      this.gitHubUser.user = false;
    }
  }
  fetchUserInformation() {
    if (this.gitHubUser.userName && this.gitHubUser.userName.length > 0){
        this.gitHubService.fetchUser().subscribe(user => {
          this.gitHubUser.user = user;
          this.userUpdated.emit(this.gitHubUser);
        },
          (error) => { console.log('error: ' + error);
          this.gitHubUser.user = false;
      },
      () => { console.log('done'); }
        );

        this.gitHubService.fetchRepositories().subscribe(repositories => {
          this.gitHubUser.repositories = repositories;
          this.userUpdated.emit(this.gitHubUser);
        },
          (error) => {
            console.log('error: ' + error);
            this.gitHubUser.user = false;
          },
          () => { console.log('done'); }
        );
    }
  }
}
