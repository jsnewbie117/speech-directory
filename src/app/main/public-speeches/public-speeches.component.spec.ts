import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSpeechesComponent } from './public-speeches.component';

describe( 'PublicSpeechesComponent', () => {
  let component : PublicSpeechesComponent;
  let fixture : ComponentFixture<PublicSpeechesComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations : [ PublicSpeechesComponent ]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( PublicSpeechesComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
