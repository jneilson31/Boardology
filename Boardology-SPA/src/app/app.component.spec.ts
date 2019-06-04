import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { HttpClientTestingModule,
         HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from './home/home.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<AppComponent>;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ AuthService ],
      schemas: [ NO_ERRORS_SCHEMA ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    component = fixture.componentInstance;
  });

  it(`should have as title 'Boardology'`, () => {
    app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Boardology');
  });
});
