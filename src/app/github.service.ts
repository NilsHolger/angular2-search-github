import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/observable';

@Injectable()
export class GitHubService {
  private userName: string;
  private clientId: string = '';
  private clientSecret: string = '';
constructor(private http: Http) { this.userName = ''; }
  fetchUser() {
    if (this.userName) {
      return this.http
          .get(
              `http://api.github.com/users/${this.userName}?client_id=${this.clientSecret}`)
          .map(response => response.json())
          .catch(this.handleError);
    }
  }
  fetchRepositories() {
    if (this.userName) {
      return this.http
          .get(
              `http://api.github.com/users/${this.userName}/repos?client_id=${this.clientId}&client_secret=${this.clientSecret}`)
          .map(response => response.json())
          .catch(this.handleError);
    }
  }
  updateUser(userName: string){
    this.userName = userName;
  }
  private handleError(error: any) {
    if (error.status === 401) {
      return Observable.throw(error.status);
    } else {
      return Observable.throw(error.status || 'server error');
    }
  }
}
