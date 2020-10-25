import {NgModule} from '@angular/core';

import { AppRoutingModule } from './router/config/app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {GuardsModule} from "./router/guards.module";
import {ComponentsModule} from "./modules/components.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    GuardsModule,
    SharedModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
