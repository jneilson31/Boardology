import { async, ComponentFixture, TestBed, flush } from '@angular/core/testing';

import { CollectionComponent } from './collection.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../_services/auth.service';

fdescribe('CollectionComponent', () => {
  let component: CollectionComponent;
  let authServiceMock;
  let fixture: ComponentFixture<CollectionComponent>;
  let app;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    authServiceMock = jasmine.createSpyObj(['loggedIn']);

    TestBed.configureTestingModule({
      declarations: [ CollectionComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    httpMock = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(CollectionComponent);

    component = fixture.componentInstance;

    app = fixture.debugElement.componentInstance;
  });


  describe('getCollection', () => {

    it('should not return collection if user is not logged in', () => {
      // Arrange
      authServiceMock.loggedIn.and.returnValue(false);
      const spy = spyOnProperty(authServiceMock, authServiceMock.decodedToken.nameid).and.returnValue(1);

      // Act
      component.getCollection();

      // Assert
      const request = httpMock.expectNone(`${component.baseUrl}games/1/collection`);
    });

    it('should return collection if user is logged in', () => {
      // Arrange
      authServiceMock.loggedIn.and.returnValue(true);
      const spy = spyOnProperty(authServiceMock, authServiceMock.decodedToken.nameid).and.returnValue(1);

      // Act
      component.getCollection();

      // Assert
      const request = httpMock.expectOne(`${component.baseUrl}games/1/collection`);
    });

  });
});
