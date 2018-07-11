import { SpeechModel } from '../../_shared/models/speech.model';

export class Login {
  // noinspection JSUnusedGlobalSymbols
  static type = '[app] login';

  constructor( public readonly username : string, public readonly password : string ) {
  }
}

export class Logout {
  // noinspection JSUnusedGlobalSymbols
  static type = '[app] logout';
}

export class GetMySpeeches {
  // noinspection JSUnusedGlobalSymbols
  static type = '[app] get-my-speeches';
}

export class GetSpeech {
  // noinspection JSUnusedGlobalSymbols
  static type = '[app] get-speech';

  constructor( public readonly id : number ) {
  }
}

export class SearchPublicSpeeches {
  // noinspection JSUnusedGlobalSymbols
  static type = '[app] search-public-speeches';

  constructor( public readonly searchTerm : string ) {
  }
}

export class AddSpeech {
  // noinspection JSUnusedGlobalSymbols
  static type = '[app] add-speech';

  constructor( public readonly speech : SpeechModel ) {
  }
}

export class EditSpeech {
  // noinspection JSUnusedGlobalSymbols
  static type = '[app] edit-speech';

  constructor( public readonly speech : SpeechModel ) {
  }
}

export class DeleteSpeech {
  // noinspection JSUnusedGlobalSymbols
  static type = '[app] delete-speech';

  constructor( public readonly id : number ) {
  }
}
