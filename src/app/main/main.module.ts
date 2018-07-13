import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MySpeechesComponent } from './my-speeches/my-speeches.component';
import { NewSpeechComponent } from './new-speech/new-speech.component';
import { PublicSpeechesComponent } from './public-speeches/public-speeches.component';
import { SpeechDetailComponent } from './speech-detail/speech-detail.component';
import { SpeechEditorComponent } from './speech-editor/speech-editor.component';
import { SpeechListComponent } from './speech-list/speech-list.component';
import { SpeechPageComponent } from './speech-page/speech-page.component';

@NgModule( {
  imports : [
    CommonModule,
    MainRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations : [
    MainComponent,
    MySpeechesComponent,
    PublicSpeechesComponent,
    NewSpeechComponent,
    SpeechListComponent,
    SpeechDetailComponent,
    SpeechEditorComponent,
    SpeechPageComponent
  ]
} )
export class MainModule {
}
