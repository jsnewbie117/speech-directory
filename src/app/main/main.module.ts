import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MySpeechesComponent } from './my-speeches/my-speeches.component';
import { NewSpeechComponent } from './new-speech/new-speech.component';
import { PublicSpeechesComponent } from './public-speeches/public-speeches.component';
import { SpeechDetailComponent } from './speech-detail/speech-detail.component';
import { SpeechEditorComponent } from './speech-editor/speech-editor.component';
import { SpeechListComponent } from './speech-list/speech-list.component';

@NgModule( {
  imports : [
    CommonModule,
    MainRoutingModule,
    NgbModule
  ],
  declarations : [
    MainComponent,
    MySpeechesComponent,
    PublicSpeechesComponent,
    NewSpeechComponent,
    SpeechListComponent,
    SpeechDetailComponent,
    SpeechEditorComponent
  ]
} )
export class MainModule {
}
