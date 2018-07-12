import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule( {
  imports : [
    CommonModule,
    AuthRoutingModule,
    NgbModule,
    FormsModule
  ],
  declarations : [ AuthComponent ]
} )
export class AuthModule {
}
