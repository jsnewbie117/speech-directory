import { State } from '@ngxs/store';
import { AppStateModel } from './app.state.model';

@State<AppStateModel>( {
  name : 'app',
  defaults : {
    currentUser: null,
    mySpeeches: null,
    publicSpeeches: null
  }
} )
export class AppState {
}
