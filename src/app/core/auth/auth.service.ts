import { Injectable } from '@angular/core';
import {User} from "../classes/User";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  private user: User;

  constructor(private router: Router) {}

  login(user: User): void {
    localStorage.setItem('user-account', JSON.stringify(user[0]));
  }

  logout(): void {
    localStorage.removeItem('user-account');
    this.router.navigate(['login']);
  }

  getUser(): User {
    if (!this.user) {
      const userObject = JSON.parse(localStorage.getItem('user-account'));
      this.user = new User(userObject);
      return this.user;
    } else {
      return this.user
    }
  }

  setUser(user: User): void {
    localStorage.setItem('user-account', JSON.stringify(user));
    const userObject = JSON.parse(localStorage.getItem('user-account'));
    this.user = new User(userObject);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user-account');
  }

}
