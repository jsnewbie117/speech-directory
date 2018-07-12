import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule( {
  imports : [
    CommonModule,
    AuthRoutingModule,
    NgbModule
  ],
  declarations : [ AuthComponent ]
} )
export class AuthModule {
}
