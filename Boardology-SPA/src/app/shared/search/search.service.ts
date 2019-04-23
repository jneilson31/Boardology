import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Product } from '../../_models/product.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductService } from '../../_services/product.service';
import Fuse from 'fuse.js';
 // import * as Fuse from 'fuse.js';

@Injectable()
export class SearchService {
  baseUrl = environment.apiUrl;
  url = `${this.baseUrl}games/search?search=`;
  products: any;
  options: Fuse.FuseOptions<Product> = {
      keys: ['name'],
  };

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  search(queryString: string): any {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
      const fuse = new Fuse(this.products, this.options);
      const results = fuse.search(queryString);
      console.log(results);
      return results;
    });

    // return this.http.get<Product[]>(this.url + queryString);
  }
}

