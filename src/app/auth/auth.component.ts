import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from '../_state/app/app.actions';

@Component( {
  selector : 'app-auth',
  templateUrl : './auth.component.html',
  styleUrls : [ './auth.component.scss' ]
} )
export class AuthComponent implements OnInit {

  loginInProgress = false;
  invalid = false;

  constructor( private store : Store, private router : Router ) {
  }

  ngOnInit() {
  }

  login( form ) {
    this.loginInProgress = true;
    this.invalid = false;
    const { username, password } = form.value;
    this.store.dispatch( new Login( username, password ) ).subscribe( () => {
      if ( this.store.selectSnapshot( state => state.app.currentUser ) ) {
        this.router.navigate( [ '' ] );
      } else {
        this.loginInProgress = false;
        this.invalid = true;
      }
    } );
  }

}
