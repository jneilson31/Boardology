import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { ProductService } from './product.service';


@Injectable()
export class AppLoadService {

    constructor(private httpClient: HttpClient, private productService: ProductService) { }

    initializeApp(): any {
        // return new Promise((resolve, reject) => {
        //     console.log(`initializeApp:: inside promise`);
        //     resolve();
        // });
    this.productService.getProducts()
    .subscribe(games => {
        this.productService.products = games;
        console.log(this.productService.products);
    });

    }
}
