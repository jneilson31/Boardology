import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';

@Injectable()
export class ProductListResolver implements Resolve<Product[]> {

    constructor(private router: Router, private productService: ProductService) { }

    resolve(): Observable<any> {
        return this.productService.getProducts().pipe(
            catchError(error => {
                console.log('error', error);
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
