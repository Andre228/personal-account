import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {AppAccountComponent} from "./components/account.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    AppAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})
export class AccountModule { }
