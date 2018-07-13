import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpeechModel } from '../../_shared/models/speech.model';
import { DeleteSpeech, EditSpeech } from '../../_state/app/app.actions';
import { AppState } from '../../_state/app/app.state';

@Component( {
  selector : 'app-speech-detail',
  templateUrl : './speech-detail.component.html',
  styleUrls : [ './speech-detail.component.scss' ]
} )
export class SpeechDetailComponent implements OnInit {

  @Select( AppState.selectedSpeech ) speech$ : Observable<SpeechModel>;

  @Output() edit = new EventEmitter<void>();

  constructor( private store : Store, private modalService : NgbModal, private router : Router ) {
  }

  ngOnInit() {
  }

  editSpeech() {
    this.edit.next();
  }

  toggleSpeech() {
    const speech = {
      ...this.store.selectSnapshot<SpeechModel>( state => state.app.selectedSpeech )
    };
    speech.isPublic = !speech.isPublic;
    this.store.dispatch( new EditSpeech( speech ) );
  }

  deleteSpeech( content ) {
    this.modalService.open( content, { size : 'sm' } );
  }

  confirmDelete() {
    const speech = this.store.selectSnapshot<SpeechModel>( state => state.app.selectedSpeech );
    this.store.dispatch( new DeleteSpeech( speech.id ) ).subscribe( () => {
      this.router.navigate( [ '' ] );
    } );
  }

}
