import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {AppLoginComponent} from "./components/login.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    AppLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
