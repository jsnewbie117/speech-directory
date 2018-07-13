import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators';
import { SpeechModel } from '../../_shared/models/speech.model';
import { GetSpeech } from '../../_state/app/app.actions';
import { AppState } from '../../_state/app/app.state';

@Component( {
  selector : 'app-speech-page',
  templateUrl : './speech-page.component.html',
  styleUrls : [ './speech-page.component.scss' ]
} )
export class SpeechPageComponent implements OnInit {

  @Select( AppState.selectedSpeech ) speech$ : Observable<SpeechModel>;
  view : boolean;

  constructor( private route : ActivatedRoute, private store : Store ) {
  }

  ngOnInit() {
    this.view = true;
    this.route.paramMap.pipe(
      switchMap( ( params : ParamMap ) => {
        this.view = true;
        return this.store.dispatch( new GetSpeech( +params.get( 'id' ) ) );
      } )
    ).subscribe();
  }
}
