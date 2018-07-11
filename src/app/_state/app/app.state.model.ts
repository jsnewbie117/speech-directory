import { SpeechModel } from '../../_shared/models/speech.model';
import { UserModel } from '../../_shared/models/user.model';

export interface AppStateModel {
  currentUser : UserModel;
  mySpeeches : SpeechModel[];
  publicSpeeches : SpeechModel[];
  selectedSpeech : SpeechModel;
}
