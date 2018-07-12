import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { AppState } from './_state/app/app.state';

@Injectable( {
  providedIn : 'root'
} )
export class AuthGuard implements CanActivate, CanActivateChild {

  @Select( AppState.currentUser ) currentUser$ : Observable<boolean>;

  constructor( private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot,
               state : RouterStateSnapshot ) : Observable<boolean> {
    return this.checkAuth();
  }

  canActivateChild( childRoute : ActivatedRouteSnapshot,
                    state : RouterStateSnapshot ) : Observable<boolean> {
    return this.checkAuth();
  }

  private checkAuth() : Observable<boolean> {
    return this.currentUser$.pipe( map( currentUser => {
      if ( currentUser ) {
        this.router.navigate( [ '' ] );
      }
      return currentUser == null;
    } ) );
  }
}
