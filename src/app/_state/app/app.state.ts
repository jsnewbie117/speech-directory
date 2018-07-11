import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators';
import { SpeechModel } from '../../_shared/models/speech.model';
import { UserModel } from '../../_shared/models/user.model';
import {
  AddSpeech,
  DeleteSpeech,
  EditSpeech,
  GetMySpeeches,
  GetSpeech,
  Login,
  Logout,
  SearchPublicSpeeches
} from './app.actions';
import { AppService } from './app.service';
import { AppStateModel } from './app.state.model';

@State<AppStateModel>( {
  name : 'app',
  defaults : {
    currentUser : null,
    mySpeeches : null,
    publicSpeeches : null,
    selectedSpeech : null
  }
} )
export class AppState {

  constructor( private appService : AppService ) {
  }

  @Selector()
  static currentUser( { currentUser } : AppStateModel ) {
    return currentUser;
  }

  @Selector()
  static mySpeeches( { mySpeeches } : AppStateModel ) {
    return mySpeeches;
  }

  @Selector()
  static publicSpeeches( { publicSpeeches } : AppStateModel ) {
    return publicSpeeches;
  }

  @Selector()
  static selectedSpeech( { selectedSpeech } : AppStateModel ) {
    return selectedSpeech;
  }

  @Action( Login )
  login( { patchState, dispatch } : StateContext<AppStateModel>, { username, password } : Login ) {
    return this.appService.login( username, password ).pipe( tap( ( currentUser : UserModel ) => {
      if ( currentUser ) {
        patchState( {
          currentUser
        } );
        dispatch( new GetMySpeeches );
      }
    } ) );
  }

  @Action( Logout )
  logout( { setState } : StateContext<AppStateModel> ) {
    setState( {
      currentUser : null,
      mySpeeches : null,
      publicSpeeches : null,
      selectedSpeech : null
    } );
  }

  @Action( GetMySpeeches )
  getMySpeeches( { getState, patchState } : StateContext<AppStateModel> ) {
    const state = getState();
    return state.mySpeeches || this.appService
      .getSpeeches( (speech => speech.authorId === state.currentUser.id) )
      .pipe( tap( ( mySpeeches : SpeechModel[] ) => patchState( { mySpeeches } ) ) );
  }

  @Action( GetSpeech )
  getSpeech( { getState, patchState } : StateContext<AppStateModel>, { id } : GetSpeech ) {
    return this.appService
      .getSpeeches( ( ( speech : SpeechModel ) => {
        return speech.id === id && (speech.authorId === getState().currentUser.id || speech.isPublic);
      } ) )
      .pipe( tap( ( [ selectedSpeech ] : SpeechModel[] ) => patchState( { selectedSpeech } ) ) );
  }

  @Action( SearchPublicSpeeches )
  searchPublicSpeeches( { patchState } : StateContext<AppStateModel>, { searchTerm } : SearchPublicSpeeches ) {
    return this.appService.getSpeeches( (speech => {
      const term = searchTerm.toLowerCase();
      const matchedTitle = speech.title.toLowerCase().indexOf( term ) > -1;
      const matchedContent = speech.content.toLowerCase().indexOf( term ) > -1;
      const matchedKeywords = speech.keywords.filter( keyword => {
        return keyword.toLowerCase().indexOf( term ) > -1;
      } ).length > 0;
      return matchedTitle || matchedContent || matchedKeywords;
    }) ).pipe( tap( ( mySpeeches : SpeechModel[] ) => patchState( { mySpeeches } ) ) );
  }

  @Action( AddSpeech )
  addSpeech( { getState, patchState } : StateContext<AppStateModel>, { speech } : AddSpeech ) {
    return this.appService.addSpeech( speech ).pipe( tap( ( response : SpeechModel ) => {
      patchState( { mySpeeches : [ ...getState().mySpeeches, response ] } );
    } ) );
  }

  @Action( EditSpeech )
  editSpeech( { getState, patchState } : StateContext<AppStateModel>, { speech } : EditSpeech ) {
    return this.appService.editSpeech( speech ).pipe( tap( ( result : SpeechModel ) => {
      patchState( {
        mySpeeches : getState().mySpeeches.map( ( speechTemp : SpeechModel ) => {
          return speechTemp.id === result.id ? <SpeechModel>{ ...result } : speechTemp;
        } )
      } );
    } ) );
  }

  @Action( DeleteSpeech )
  deleteSpeech( { getState, patchState } : StateContext<AppStateModel>, { id } : DeleteSpeech ) {
    return this.appService.deleteSpeech( id ).pipe( tap( () => {
      patchState( {
        mySpeeches : getState().mySpeeches.filter( ( speech : SpeechModel ) => speech.id !== id )
      } );
    } ) );
  }

}
