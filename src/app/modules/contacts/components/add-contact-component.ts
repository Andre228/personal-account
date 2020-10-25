import { Component, OnInit } from '@angular/core';
import {Rest} from "../../../core/rest/rest.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";
import {AuthService} from "../../../core/auth/auth.service";
import {Contact, CONTACT_ACTIONS} from "./contacts.component";

@Component({
  selector: 'app-add-contact',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <app-input [class]="'mb-3'" [text]="'Type here you contact name'" (changeEvent)="changeContactName($event)"></app-input>
      <app-input [class]="'mb-3'" [text]="'Type here you contact phone'" (changeEvent)="changePhoneNumber($event)"></app-input>
    </div>
    <div class="modal-footer">
      <button [disabled]="isValid()" type="button" class="btn btn-outline-primary" (click)="createContact()">{{ closeBtnName }}</button>
    </div>
  `
})
export class AppAddContactComponent implements OnInit {

  title: string = '';
  closeBtnName: string = '';
  private contactName: string = '';
  private phoneNumber: string = '';

  updatingContact: Contact = null;

  private responseModalSubject$ = new Subject<{ state: string, response: {}, text: string }>();

  constructor(private rest: Rest,
              public bsModalRef: BsModalRef,
              private authService: AuthService) {}

  ngOnInit() {
    this.bsModalRef.setClass('modal-lg');
  }

  changeContactName(event) {
    this.contactName = event;
  }

  changePhoneNumber(event) {
    this.phoneNumber = event;
  }

  createContact() {
    if (this.isValid()) {
      return;
    } else {
      const body = {
        tag: this.authService.getUser().getId(),
        name: this.contactName.trim(),
        phone: this.phoneNumber.trim()
      };
      this.rest.post('/contacts', body)
        .then(response => {
          if (response) this.responseModalSubject$.next({
            state: CONTACT_ACTIONS[CONTACT_ACTIONS.CREATE],
            response: response,
            text: `Contact ${response.name} added successfully`
          });
          this.bsModalRef.hide();
        })
        .catch(error => {
          console.error(error);
          this.bsModalRef.hide();
        })
    }
  }

  isValid(): boolean {
    return this.contactName.trim() === '' || this.phoneNumber.trim() === '';
  }

}
