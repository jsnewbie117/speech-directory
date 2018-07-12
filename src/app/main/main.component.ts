import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logout } from '../_state/app/app.actions';

@Component( {
  selector : 'app-main',
  templateUrl : './main.component.html',
  styleUrls : [ './main.component.scss' ]
} )
export class MainComponent implements OnInit {

  constructor( private store : Store, private router : Router ) {
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch( new Logout ).subscribe( () => this.router.navigate( [ 'auth' ] ) );
  }

}
