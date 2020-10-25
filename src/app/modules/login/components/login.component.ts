import {Component, OnDestroy, OnInit} from '@angular/core';
import {Rest} from "../../../core/rest/rest.service";
import {NgxSpinnerService} from "ngx-bootstrap-spinner";
import {ReplaySubject, Subject} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-login',
  template: `
    <div class="container col-sm-6">
      <h1 class="d-flex justify-content-center">
        Login form
      </h1>
      <app-labeled-input [labelText]="'Login'" 
                         [description]="'We ll never share your login with anyone else.'"
                         [type]="'text'"
                         (changeEvent)="login = $event">
      </app-labeled-input>
      <app-labeled-input [labelText]="'Password'" 
                         [type]="'password'"
                         (changeEvent)="password = $event">
      </app-labeled-input>
      <button type="button" class="btn btn-primary" (click)="doLogin()">Login</button>
      <app-alert [text]="alertText" [type]="alertType" (clearInputDataEvent)="clearAlertData()"></app-alert>
    </div>
  `
})
export class AppLoginComponent implements OnInit, OnDestroy {


  private responseSubject$ = new Subject<{}>();
  private readonly destroyed$ = new ReplaySubject<void>(1);

  login: string = '';
  password: string = '';
  alertText: string = '';
  alertType: string = '';



  constructor(private rest: Rest,
              private spinnerService: NgxSpinnerService,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  async doLogin() {
    this.spinnerService.show();
    if (this.login.trim() === '' || this.password.trim() === '') {
      return;
    } else {
      const url = `/accounts?login=${this.login}&password=${this.password}`;
      let user = await this.rest.get(url)
        .then(response => response)
        .catch(error => {
          console.error(error);
          this.setAlert(error, 'danger');
          this.spinnerService.hide();
        });
      if (user.length > 0) {
        this.authService.login(user);
        this.router.navigate(['account']);
      } else {
        this.setAlert('This user is not exist', 'danger');
      }
      this.spinnerService.hide();
    }
  }

  private setAlert(alertText: string, alertType: string): void {
    this.alertText = alertText;
    this.alertType = alertType;
  }

  clearAlertData() {
    this.alertText = '';
    this.alertType = '';
  }

}
