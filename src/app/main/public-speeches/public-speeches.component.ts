import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpeechModel } from '../../_shared/models/speech.model';
import { SearchPublicSpeeches } from '../../_state/app/app.actions';
import { AppState } from '../../_state/app/app.state';

@Component( {
  selector : 'app-public-speeches',
  templateUrl : './public-speeches.component.html',
  styleUrls : [ './public-speeches.component.scss' ]
} )
export class PublicSpeechesComponent implements OnInit {

  @Select( AppState.publicSpeeches ) speeches$ : Observable<SpeechModel[]>;
  term : string;

  constructor( public store : Store ) {
  }

  ngOnInit() {
    // fromEvent( this.searchInput.nativeElement, 'input' )
    //   .pipe(
    //     map( event => event.target.value ),
    //     debounceTime( 300 ),
    //     distinctUntilChanged(),
    //     switchMap( value => {
    //       console.log( value );
    //       return this.store.dispatch( new SearchPublicSpeeches( value ) );
    //     } )
    //   )
    //   .subscribe();
  }

  search() {
    if ( this.term ) {
      this.store.dispatch( new SearchPublicSpeeches( this.term ) );
    }
  }

}
