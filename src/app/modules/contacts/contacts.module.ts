import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {AppContactsComponent} from "./components/contacts.component";
import {SharedModule} from "../../shared/shared.module";
import {AppEditContactComponent} from "./components/edit-contact.component";
import {AppAddContactComponent} from "./components/add-contact-component";

@NgModule({
  declarations: [
    AppContactsComponent,
    AppEditContactComponent,
    AppAddContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})
export class ContactsModule { }
