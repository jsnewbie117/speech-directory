import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule( {
  imports : [
    CommonModule,
    MainRoutingModule,
    NgbModule
  ],
  declarations : [ MainComponent ]
} )
export class MainModule {
}
