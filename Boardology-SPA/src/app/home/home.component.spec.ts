import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Observable, of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let productService: ProductService;
  let fixture: ComponentFixture<HomeComponent>;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [ProductService],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    app = fixture.debugElement.componentInstance;
    productService = fixture.debugElement.injector.get(ProductService);
    component = fixture.componentInstance;
  });

  it('should fetch products using the product service and set products to the return value', fakeAsync(() => {
    // Arrange
    const spy = spyOn(productService, 'getProducts').and.returnValue(of('products'));
    fixture.detectChanges();
    tick();
    // Act

    // Assert
    expect(spy).toHaveBeenCalled();
    expect(app.products).toBe('products');
  }));
});
