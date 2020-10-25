import {Component, OnDestroy, OnInit} from '@angular/core';
import {Rest} from "../../../core/rest/rest.service";
import {NgxSpinnerService} from "ngx-bootstrap-spinner";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {AppEditContactComponent} from "./edit-contact.component";
import {AppAddContactComponent} from "./add-contact-component";
import {ReplaySubject, Subject} from "rxjs";
import {takeUntil} from "rxjs/internal/operators";
import {AuthService} from "../../../core/auth/auth.service";

export enum MODAL_ACTIONS {
  CREATE_MODAL,
  EDIT_MODAL
}

export enum CONTACT_ACTIONS {
  CREATE,
  EDIT
}

export interface Contact {
  id: number;
  name: string;
  phone: string;
  tag: string;
}

interface TableRender {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-contacts',
  template: `
    <div class="container col-lg-8 justify-content-center mt-2">
    <nav class="navbar navbar-expand-lg navbar-light justify-content-between bg-slb">
      <a class="navbar-brand">You contact list</a>
      <app-input [class]="'pull-right'" 
                 [type]="'search'" 
                 [placeholder]="'Type here to search'" 
                 (keyupEvent)="doSearch($event)"
                 (focusoutEvent)="changeInputState($event)">
      </app-input>
    </nav>
      <div class="mt-2">
        <button type="button" class="btn btn-primary" (click)="openModalWithComponent($event, 'CREATE_MODAL')">Create</button>
        <app-alert [text]="alertText" 
                   [type]="alertType"
                   (clearInputDataEvent)="clearAlertData()">         
        </app-alert>
      </div>
      
      <div class="h-60">
        <app-table [tableHeader]="header" 
                   [tableBody]="filtered"
                   (clickEvent)="openModalWithComponent($event, 'EDIT_MODAL')"
                   (deleteEvent)="deleteContact($event)">          
        </app-table>
      </div>

    </div>
  `
})
export class AppContactsComponent implements OnInit, OnDestroy {

  filtered: TableRender [] = [];
  header: string [] = ['#', 'Contact name', 'Contact phone'];
  tableData: TableRender [] = [];
  private contacts: Contact [] = [];
  private bsModalRef: BsModalRef;

  private responseModalSubject$ = new Subject<{ state: string, response: {}, text: string }>();
  private readonly destroy$ = new ReplaySubject<void>(1);

  alertText: string = '';
  alertType: string = '';

  constructor(private rest: Rest,
              private spinnerService: NgxSpinnerService,
              private modalService: BsModalService,
              private authService: AuthService) {}

  ngOnInit() {
    this.loadContacts();
    this.afterActions();
  }

  private loadContacts(): void {
    this.spinnerService.show();
    const url = `/contacts?tag=${this.authService.getUser().getId()}`;
    this.rest.get(url)
      .then(response => {
        this.contacts = response ? response : [];
        this.setTableData();
        this.spinnerService.hide();
      })
      .catch(error => {
        console.error(error);
        this.setAlert('Failed to load contact list :(', 'danger');
        this.spinnerService.hide();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  openModalWithComponent(event?, state?): void {

    let componentType: any;
    let titleText = '';
    let buttonText = '';
    let updatingContact: Contact;

    if (state === MODAL_ACTIONS[MODAL_ACTIONS.CREATE_MODAL]) {
      componentType = AppAddContactComponent;
      titleText = 'Create a new contact';
      buttonText = 'Create';
    } else if (state === MODAL_ACTIONS[MODAL_ACTIONS.EDIT_MODAL]) {
      updatingContact = this.contacts[event];
      componentType = AppEditContactComponent;
      titleText = 'Edit a contact';
      buttonText = 'Edit';
    }

    const initialState = {
      title: titleText,
      responseModalSubject$: this.responseModalSubject$,
      updatingContact: updatingContact
    };

    this.bsModalRef = this.modalService.show(componentType, { initialState: initialState } as ModalOptions);
    this.bsModalRef.content.closeBtnName = buttonText;
  }

  deleteContact(index: number) {
    this.spinnerService.show();
    const contact = this.contacts[index];
    if (contact) {
      const url = `/contacts/${contact.id}`;
      this.rest.delete(url)
        .then(response => {
          this.contacts.forEach((contactItem, index, array) => {
            if (contactItem.id === contact.id) {
              array.splice(index, 1);
            }
          });
          this.setTableData();
          this.setAlert(`Contact ${contact.name} successfully deleted`, 'primary');
          this.spinnerService.hide();
        })
        .catch(error => {
          console.log(error);
          this.setAlert('Failed to delete the selected contact :(', 'danger');
          this.spinnerService.hide();
        })
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

  private setTableData(): void {
    this.tableData = this.filtered = this.contacts.map(contact => {
      return {
        name: contact.name,
        phone: contact.phone,
      } as TableRender
    })
  }

  private afterActions(): void {
    this.responseModalSubject$.pipe(takeUntil(this.destroy$)).subscribe(item => {
      if (item.response) {
        const contact = item.response as Contact;
        if (item.state === CONTACT_ACTIONS[CONTACT_ACTIONS.CREATE]) {
          this.contacts.push(contact);
        } else if (item.state === CONTACT_ACTIONS[CONTACT_ACTIONS.EDIT]) {
          this.contacts.forEach((contactItem, index, array) => {
            if (contactItem.id === contact.id) {
              array[index] = contact;
            }
          });
        }
        this.setTableData();
        this.setAlert(item.text, 'primary');
      } else {
        this.setAlert('An error occured :(', 'danger');
      }
    });
  }

  doSearch(searchingString: string): void {
    if (searchingString === '') {
      this.setTableData();
    }
    this.filtered = this.tableData.filter(item =>
       item.name.toLowerCase().includes(searchingString.toLowerCase())
    || item.phone.toLowerCase().includes(searchingString.toLowerCase()));
  }

  changeInputState(searchingString: string) {
    if (searchingString === '') {
      this.setTableData();
    } else return;
  }

}
