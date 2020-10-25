import { Component, OnInit } from '@angular/core';
import {Rest} from "../../../core/rest/rest.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Contact, CONTACT_ACTIONS} from "./contacts.component";
import {Subject} from "rxjs";
import {AuthService} from "../../../core/auth/auth.service";

export interface ContactObjectRender {
  labelText: string;
  value: string | number;
  type: string;
}

@Component({
  selector: 'app-edit-contact',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <app-labeled-input *ngFor="let item of contactObjectRender"
                         [labelText]="item.labelText" 
                         [descriptionDynamic]="true"
                         [type]="item.type"
                         [value]="item.value"
                         [required]="true"
                         (changeEvent)="item.value = $event; isUpdateDisable = false;">                 
      </app-labeled-input>
    </div>
    <div class="modal-footer">
      <button [disabled]="isUpdateDisable" type="button" class="btn btn-outline-primary" (click)="updateContact()">{{ closeBtnName }}</button>
    </div>
    
  `
})
export class AppEditContactComponent implements OnInit {

  isUpdateDisable: boolean = true;
  contactObjectRender: ContactObjectRender [] = [];

  title: string;
  closeBtnName: string;

  updatingContact: Contact;

  private responseModalSubject$ = new Subject<{ state: string, response: {}, text: string }>();

  constructor(private rest: Rest,
              public bsModalRef: BsModalRef,
              private authService: AuthService) {}

  ngOnInit() {
    this.setDefaultAccount();
  }

  setDefaultAccount(): void {
    this.contactObjectRender = [];
    this.isUpdateDisable = true;
    let user = this.updatingContact;
    for(let key in user) {
      switch (key) {
        case 'name':
          this.contactObjectRender.push({ labelText: 'Contact name', value: this.updatingContact.name, type: 'text'});
          break;
        case 'phone':
          this.contactObjectRender.push({ labelText: 'Contact phone', value: this.updatingContact.phone, type: 'text'});
          break;
      }
    }
  }

  updateContact(): void {
    const contactName = this.contactObjectRender[0].value.toString().trim();
    const contactPhone = this.contactObjectRender[1].value.toString().trim();
    if (contactName === '' || contactPhone === '') {
      return;
    } else {
      const body = {
        tag: this.authService.getUser().getId(),
        name: contactName,
        phone: contactPhone
      };
      const url = `/contacts/${this.updatingContact.id}`;
      this.rest.put(url, body)
        .then(response => {
          if (response) this.responseModalSubject$.next({
            state: CONTACT_ACTIONS[CONTACT_ACTIONS.EDIT],
            response: response,
            text: `You contact ${this.updatingContact.name} has been successfully updated`
          });
          this.bsModalRef.hide();
        })
        .catch(error => {
          console.error(error);
          this.bsModalRef.hide();
        })
    }
    this.bsModalRef.hide();
  }

}
