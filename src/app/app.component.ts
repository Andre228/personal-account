import { Component } from '@angular/core';
import {AuthService} from "./core/auth/auth.service";

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-bottom bg-danger">
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a *ngIf="isLogged()" class="nav-link" routerLink="/">Account<span class="sr-only">(current)</span></a>
            </li>
            <li *ngIf="isLogged()" class="nav-item">
              <a class="nav-link" routerLink="/contacts">Contacts</a>
            </li>
            <li *ngIf="!isLogged()" class="nav-item">
              <a class="nav-link" routerLink="/login">Login</a>
            </li>
            <li *ngIf="isLogged()" class="nav-item">
              <a class="nav-link btn" (click)="logout()">Logout</a>
            </li>
          </ul>
        </div>
        <a *ngIf="isLogged()" class="navbar-text" routerLink="/">
          {{ getLogin() }}
        </a>
      </nav>
    </header>
    <ngx-bootstrap-spinner loadingText="Loading..."></ngx-bootstrap-spinner>
    <router-outlet></router-outlet>
`
})
export class AppComponent {

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn()
  }

  getLogin() {
    return this.authService.getUser().getLogin();
  }

}
