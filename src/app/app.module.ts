import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './_state/app/app.state';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule( {
  declarations : [
    AppComponent
  ],
  imports : [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot( [ AppState ] ),
    NgbModule.forRoot()
  ],
  providers : [],
  bootstrap : [ AppComponent ]
} )
export class AppModule {
}
