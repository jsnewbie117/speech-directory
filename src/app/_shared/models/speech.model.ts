import { UserModel } from './user.model';

export interface SpeechModel {
  id : number;
  title : string;
  content : string;
  authorId : number;
  author? : UserModel;
  keywords : string[];
  dateOfSpeech : string;
  isPublic : boolean;
}
