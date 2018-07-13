import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpeechModel } from '../../_shared/models/speech.model';
import { UserModel } from '../../_shared/models/user.model';
import { AddSpeech, EditSpeech } from '../../_state/app/app.actions';
import { AppState } from '../../_state/app/app.state';

@Component( {
  selector : 'app-speech-editor',
  templateUrl : './speech-editor.component.html',
  styleUrls : [ './speech-editor.component.scss' ]
} )
export class SpeechEditorComponent implements OnInit {

  @Select( AppState.selectedSpeech ) speech$ : Observable<SpeechModel>;
  @Output() saved = new EventEmitter<void>();
  speechSnapshot : SpeechModel;
  speechForm : FormGroup;

  constructor( private fb : FormBuilder, private store : Store ) {
    this.speechForm = this.fb.group( {
      title : '',
      content : '',
      keywords : '',
      dateOfSpeech : ''
    } );
  }

  ngOnInit() {
    this.speech$.subscribe( ( speech : SpeechModel ) => {
      const currentDate = new Date();
      const parsedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
      this.speechSnapshot = speech || {
        title : '',
        content : '',
        keywords : [],
        dateOfSpeech : parsedDate,
        isPublic : false
      };
      this.speechForm.reset( {
        title : speech && speech.title || '',
        content : speech && speech.content || '',
        keywords : speech && speech.keywords || '',
        dateOfSpeech : this.parseDateToStruct( speech && speech.dateOfSpeech || parsedDate )
      } );
    } );
  }

  save() {
    const speech = this.sanitizePayload();
    this.speechForm.disable();
    this.store
      .dispatch( new (this.speechSnapshot.id ? EditSpeech : AddSpeech)( speech ) )
      .subscribe( () => {
        this.speechForm.enable();
        this.saved.emit();
      } );
  }

  cancel() {
    this.saved.emit();
  }

  private parseDateToStruct( date : string ) : NgbDateStruct {
    const split = date.split( '-' );
    return {
      year : +split[ 0 ],
      month : +split[ 1 ],
      day : +split[ 2 ]
    };
  }

  private parseDateFromStuct( date : NgbDateStruct ) : string {
    const month = ('0' + date.month).split( '' ).splice( -2 ).join( '' );
    const day = ('0' + date.day).split( '' ).splice( -2 ).join( '' );
    return [ date.year, month, day ].join( '-' );
  }

  private sanitizePayload() : SpeechModel {
    const formValue = this.speechForm.getRawValue();
    const currentUser = this.store.selectSnapshot<UserModel>( ( state : AppState ) => state.app.currentUser );
    return {
      id : this.speechSnapshot.id,
      title : formValue.title,
      content : formValue.content,
      keywords : Array.isArray( formValue.keywords ) ? formValue.keywords : formValue.keywords.split( ',' ),
      dateOfSpeech : this.parseDateFromStuct( formValue.dateOfSpeech ),
      authorId : currentUser.id,
      isPublic : this.speechSnapshot.isPublic
    };
  }

}
