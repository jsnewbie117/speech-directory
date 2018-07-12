import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MainGuard } from './main.guard';

const routes : Routes = [
  {
    path : 'auth',
    loadChildren : './auth/auth.module#AuthModule',
    canActivate : [ AuthGuard ],
    canActivateChild : [ AuthGuard ]
  },
  {
    path : '',
    loadChildren : './main/main.module#MainModule',
    canActivate : [ MainGuard ],
    canActivateChild : [ MainGuard ]
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
