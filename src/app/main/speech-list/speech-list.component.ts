import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpeechModel } from '../../_shared/models/speech.model';
import { AppState } from '../../_state/app/app.state';

@Component( {
  selector : 'app-speech-list',
  templateUrl : './speech-list.component.html',
  styleUrls : [ './speech-list.component.scss' ]
} )
export class SpeechListComponent implements OnInit {

  @Select( AppState.mySpeeches ) speeches$ : Observable<SpeechModel[]>;

  constructor() {
  }

  ngOnInit() {
  }

}
