import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpeechModel } from '../../_shared/models/speech.model';
import { EditSpeech } from '../../_state/app/app.actions';
import { AppState } from '../../_state/app/app.state';

@Component( {
  selector : 'app-speech-detail',
  templateUrl : './speech-detail.component.html',
  styleUrls : [ './speech-detail.component.scss' ]
} )
export class SpeechDetailComponent implements OnInit {

  @Select( AppState.selectedSpeech ) speech$ : Observable<SpeechModel>;

  @Output() edit = new EventEmitter<void>();

  constructor( private store : Store ) {
  }

  ngOnInit() {
  }

  editSpeech() {
    this.edit.next();
  }

  toggleSpeech() {
    const speech = {
      ...this.store.selectSnapshot<SpeechModel>( ( state : AppState ) => state.app.selectedSpeech )
    };
    speech.isPublic = !speech.isPublic;
    this.store.dispatch( new EditSpeech( speech ) );
  }

}
