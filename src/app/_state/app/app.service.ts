import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Observer } from 'rxjs';
import { SpeechModel } from '../../_shared/models/speech.model';
import { UserModel } from '../../_shared/models/user.model';

@Injectable( {
  providedIn : 'root'
} )
export class AppService {

  private users : UserModel[];
  private speeches : SpeechModel[];
  private speechId : number;

  constructor( http : HttpClient ) {
    forkJoin( http.get( '/assets/users.json' ), http.get( '/assets/speeches.json' ) )
      .subscribe( ( [ users, speeches ] ) => {
        this.users = <UserModel[]>users;
        this.speeches = (<SpeechModel[]>speeches).map( ( speech : SpeechModel ) => {
          speech.author = this.users.find( user => user.id === speech.authorId );
          return speech;
        } );
        this.speechId = this.speeches.length + 1;
      } );
  }

  login( username : string, password : string ) : Observable<UserModel> {
    return new Observable( ( obs : Observer<UserModel> ) => {
      setTimeout( () => {
        const userResult : UserModel = this.users.find( ( user : UserModel ) => {
          return user.username === username && user.password === password;
        } );
        obs.next( userResult );
        obs.complete();
      }, 1000 );
    } );
  }

  getSpeeches( filter : ( speech : SpeechModel ) => boolean ) : Observable<SpeechModel[]> {
    return new Observable( ( obs : Observer<SpeechModel[]> ) => {
      setTimeout( () => {
        const speeches : SpeechModel[] = this.speeches.filter( filter );
        obs.next( speeches );
        obs.complete();
      }, 1000 );
    } );
  }

  addSpeech( speech : SpeechModel ) : Observable<SpeechModel> {
    return new Observable( ( obs : Observer<SpeechModel> ) => {
      setTimeout( () => {
        speech.id = this.speechId++;
        speech.author = this.users.find( ( user : UserModel ) => user.id === speech.authorId );
        obs.next( speech );
        obs.complete();
      }, 1000 );
    } );
  }

  editSpeech( speech : SpeechModel ) : Observable<SpeechModel> {
    return new Observable( ( obs : Observer<SpeechModel> ) => {
      setTimeout( () => {
        this.speeches.map( ( speechTemp : SpeechModel ) => {
          if ( speechTemp.id === speech.id ) {
            speechTemp = <SpeechModel>{ ...speech };
          }
          return speechTemp;
        } );
        obs.next( speech );
        obs.complete();
      }, 1000 );
    } );
  }

  deleteSpeech( id : number ) : Observable<null> {
    return new Observable( ( obs : Observer<null> ) => {
      setTimeout( () => {
        this.speeches = this.speeches.filter( ( speech : SpeechModel ) => speech.id !== id );
        obs.next( null );
        obs.complete();
      }, 1000 );
    } );
  }

}
