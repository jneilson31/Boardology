import { async, ComponentFixture, TestBed, flush } from '@angular/core/testing';

import { CollectionComponent } from './collection.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../_services/auth.service';
import { CollectionProduct } from '../_models/collection-product.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let authServiceSpy;
  let httpClientSpy;
  let fixture: ComponentFixture<CollectionComponent>;
  let app;

  beforeEach(() => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['loggedIn']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      declarations: [ CollectionComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: HttpClient, useValue: httpClientSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(CollectionComponent);

    authServiceSpy = TestBed.get(AuthService);


    component = fixture.componentInstance;

    app = fixture.debugElement.componentInstance;
  });


  describe('getCollection', () => {

    it('should not return collection if user is not logged in', () => {
      // Arrange
      const collection: CollectionProduct[] = [
        { id: 1, name: 'test', photoUrl: 'testUrl' },
        { id: 2, name: 'test2', photoUrl: 'testUrl2' }
      ];
      authServiceSpy.loggedIn.and.returnValue(false);
      authServiceSpy.decodedToken = {
        nameid: 1
      };
      httpClientSpy.get.and.returnValue(of(collection));

      // Act
      component.getCollection();

      // Assert
      expect(component.productCollection).toBe(undefined);
    });

    it('should return collection if user is logged in', () => {
      // Arrange
      const collection: CollectionProduct[] = [
        {id: 1, name: 'test', photoUrl: 'testUrl'},
        { id: 2, name: 'test2', photoUrl: 'testUrl2' }
      ];
      authServiceSpy.loggedIn.and.returnValue(true);
      authServiceSpy.decodedToken = {
        nameid: 1
      };
      httpClientSpy.get.and.returnValue(of(collection));

      // Act
      component.getCollection();

      // Assert
      // const request = httpMock.expectOne(`${component.baseUrl}games/1/collection`);
      expect(component.productCollection).toBe(collection);
    });

  });
});
