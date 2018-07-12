import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MySpeechesComponent } from './my-speeches/my-speeches.component';
import { NewSpeechComponent } from './new-speech/new-speech.component';
import { PublicSpeechesComponent } from './public-speeches/public-speeches.component';

const routes : Routes = [
  {
    path : '',
    component : MainComponent,
    children : [
      {
        path : 'new',
        component : NewSpeechComponent
      },
      {
        path : 'search',
        component : PublicSpeechesComponent
      },
      {
        path : '',
        component : MySpeechesComponent
      }
    ]
  }
];

@NgModule( {
  imports : [ RouterModule.forChild( routes ) ],
  exports : [ RouterModule ]
} )
export class MainRoutingModule {
}
