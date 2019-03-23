import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';

@Injectable()
export class ProductDetailResolver implements Resolve<Product[]> {
  constructor(private router: Router, private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
    return this.productService.getProduct(route.params['gameId']).pipe(
      catchError(error => {
        console.log('error', error);
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
