import { NgModule } from '@angular/core';
import { Rest } from './rest/rest.service';
import { AuthService } from "./auth/auth.service";

@NgModule({
  providers: [
    Rest,
    AuthService
  ]
})
export class CoreModule {
}
