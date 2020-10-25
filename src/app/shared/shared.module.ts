import {ALERT_DECLARATIONS} from "./alert/components/index";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {ModalModule} from "ngx-bootstrap/modal";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {NgxSpinnerModule} from "ngx-bootstrap-spinner";
import {INPUT_DECLARATIONS} from "./input/components/index";
import {AlertModule} from "ngx-bootstrap/alert";
import {TABLE_DECLARATIONS} from "./table/components/index";


@NgModule({
  declarations: [
    ...ALERT_DECLARATIONS,
    ...INPUT_DECLARATIONS,
    ...TABLE_DECLARATIONS,
  ],
  exports: [
    ...ALERT_DECLARATIONS,
    ...INPUT_DECLARATIONS,
    ...TABLE_DECLARATIONS,
    FormsModule,
    BrowserModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    NgxSpinnerModule,
    AlertModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    AlertModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
