import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {GUARD_PROVIDERS} from "./guards/index";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GUARD_PROVIDERS],
  bootstrap: []
})
export class GuardsModule { }
