import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../_models/product.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  max = 20;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get<Product[]>(`${this.baseUrl}games`)
    .subscribe(products => {
      this.products = products;
    });

  }

  viewMore(): void {
    this.max = this.max + 20;
  }

  scrollToTop(): void {
    window.scroll(0, 0);
  }

}
