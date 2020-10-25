import { Routes } from '@angular/router';

import {AppContactsComponent} from "../../modules/contacts/components/contacts.component";
import {AuthGuard} from "../guards/auth-guard";


export const CONTACT_ROUTING: Routes = [
  {path: 'contacts', component: AppContactsComponent, canActivate: [AuthGuard]}
];
