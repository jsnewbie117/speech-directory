import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path : 'auth',
    loadChildren : './auth/auth.module#AuthModule'
  },
  {
    path : '',
    loadChildren : './main/main.module#MainModule'
  },
  {
    path : '**',
    redirectTo : '/'
  }
];

@NgModule( {
  imports : [ RouterModule.forRoot( routes ) ],
  exports : [ RouterModule ]
} )
export class AppRoutingModule {
}
