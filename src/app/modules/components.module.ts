import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";
import {ContactsModule} from "./contacts/contacts.module";
import {AccountModule} from "./account/account.module";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    ContactsModule,
    AccountModule
  ],
  exports: [
    LoginModule,
    ContactsModule,
    AccountModule
  ],
  providers: [],
  bootstrap: []
})
export class ComponentsModule { }
