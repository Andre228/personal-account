import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CONTACT_ROUTING} from "./contact-routing";
import {AppAccountComponent} from "../../modules/account/components/account.component";
import {LOGIN_ROUTING} from "./login-routing";
import {AuthGuard} from "../guards/auth-guard";

const routes: Routes = [
   {path: '', component: AppAccountComponent, canActivate: [AuthGuard]},
  ...CONTACT_ROUTING,
  ...LOGIN_ROUTING,
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
