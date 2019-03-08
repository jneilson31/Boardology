import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: number;
  product: Product;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.productId = this.route.snapshot.params.gameid;
    this.http.get<Product>(`http://localhost:5000/api/games/${this.productId}`)
      .subscribe(product => {
        this.product = product;
      });
  }

}
