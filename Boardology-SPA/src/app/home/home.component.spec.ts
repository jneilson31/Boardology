import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { of } from 'rxjs';
import { Product } from '../_models/product.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let productServiceMock;
  let fixture: ComponentFixture<HomeComponent>;
  let app;

  beforeEach(() => {

    productServiceMock = jasmine.createSpyObj(['getProducts']);

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {provide: ProductService, useValue: productServiceMock}
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    });

    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance;

    app = fixture.debugElement.componentInstance;

  });

  describe('ngOnInit', () => {

    it('should fetch products using the product service and set products to the return value', () => {
      // Arrange
      const products: Product[] = [
        {id: 1, name: 'product', description: 'test', upvotes: 1, downvotes: 3, numReviews: 4, numPlayers: '2-4',
      timeToPlay: '25', ageSuggestion: '2-3', yearCreated: 2015, photoUrl: 'testUrl', category: ['adventure', 'test']
        },
        {id: 2, name: 'test', description: 'wow', upvotes: 1, downvotes: 3, numReviews: 4, numPlayers: '2-5',
        timeToPlay: '28', ageSuggestion: '1-3', yearCreated: 2019, photoUrl: 'testUrl', category: ['adventure', 'children']
        }
      ];
      productServiceMock.getProducts.and.returnValue(of(products));
      // flush();
      // Act
      component.ngOnInit();
      // Assert
      expect(productServiceMock.getProducts).toHaveBeenCalled();
      expect(component.products).toBe(products);
    });
  });
});
