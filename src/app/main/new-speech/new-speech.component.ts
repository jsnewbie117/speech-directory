import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetSpeech } from '../../_state/app/app.actions';

@Component( {
  selector : 'app-new-speech',
  templateUrl : './new-speech.component.html',
  styleUrls : [ './new-speech.component.scss' ]
} )
export class NewSpeechComponent implements OnInit {

  constructor( private store : Store, private router : Router ) {
  }

  ngOnInit() {
    this.store.dispatch( new GetSpeech( null ) );
  }

  saved( speechId ) {
    if ( speechId ) {
      this.router.navigate( [ 'speech', speechId ] );
    }
  }

}
