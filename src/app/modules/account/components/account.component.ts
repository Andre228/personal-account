import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {NgxSpinnerService} from "ngx-bootstrap-spinner";
import {Rest} from "../../../core/rest/rest.service";
import {User} from "../../../core/classes/User";

export interface AccountObjectRender {
  labelText: string;
  value: string | number;
  type: string;
}

@Component({
  selector: 'app-account',
  template: `
    <div class="col-sm-6">
      <h1 class="d-flex justify-content-start">
        You account page
      </h1>
      <app-labeled-input *ngFor="let item of accountObjectRender"
                         [labelText]="item.labelText" 
                         [descriptionDynamic]="true"
                         [type]="item.type"
                         [value]="item.value"
                         [required]="true"
                         (changeEvent)="item.value = $event; isUpdateDisable = false;">
      </app-labeled-input>
      <div class="d-flex justify-content-between">
        <button [disabled]="isUpdateDisable" type="button" class="btn btn-primary" (click)="updateData()">Update</button>
        <button [disabled]="isUpdateDisable" type="button" class="btn btn-light" (click)="setDefaultAccount()">Reset</button>
      </div>
      <app-alert [text]="alertText" [type]="alertType" (clearInputDataEvent)="clearAlertData()"></app-alert>
    </div>
  `
})
export class AppAccountComponent implements OnInit {

  alertText: string = '';
  alertType: string = '';

  isUpdateDisable: boolean = true;

  accountObjectRender: AccountObjectRender [] = [];

  constructor(private rest: Rest,
              private spinnerService: NgxSpinnerService,
              private authService: AuthService) {}

  ngOnInit() {
    this.setDefaultAccount();
  }

  updateData(): void {
     this.spinnerService.show();
     const url = `/accounts/${this.authService.getUser().getId()}`;
     this.rest.put(url, this.getUserFromAccountObjectRender())
       .then(response => {
         this.authService.setUser(response);
         this.setAlert('Your account details have been successfully updated', 'primary');
         this.isUpdateDisable = true;
         this.spinnerService.hide();
       })
       .catch(error => {
         console.error(error);
         this.setAlert('An error has occurred, your data has not been updated :(', 'danger');
         this.isUpdateDisable = false;
         this.spinnerService.hide();
       })
  }

  setDefaultAccount(): void {
    this.accountObjectRender = [];
    this.isUpdateDisable = true;
    let user = this.authService.getUser();
    for(let key in user) {
      switch (key) {
        case 'login':
          this.accountObjectRender.push({ labelText: 'Login', value: user.getLogin(), type: 'text'});
        break;
        case 'password':
          this.accountObjectRender.push({ labelText: 'Password', value: user.getPassword(), type: 'password'});
          break;
        case 'job':
          this.accountObjectRender.push({ labelText: 'Job', value: user.getJob(), type: 'text'});
          break;
        case 'age':
          this.accountObjectRender.push({ labelText: 'Age', value: user.getAge(), type: 'text'});
          break;
        case 'name':
          this.accountObjectRender.push({ labelText: 'Name', value: user.getName(), type: 'text'});
          break;
      }
    }
  }

  private getUserFromAccountObjectRender(): User {
    let userObject = {} as User;
    const userKeys = Object.keys(this.authService.getUser());
    this.accountObjectRender.forEach(accountObject => {
      const labelText = accountObject.labelText.toLowerCase();
      if (userKeys.indexOf(labelText) !== -1) {
        userObject[labelText] = accountObject.value;
      }
    });

    return userObject;
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
