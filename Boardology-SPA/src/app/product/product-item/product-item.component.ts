import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../_models/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

    getShortenedDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

    upvoteGame(productId: string): void {
      this.http.post(`http://localhost:5000/api/votes/1/${productId}/upvote`, {})
      .subscribe(response => {
        this.product.upvotes++;
      }, error => {
        console.log(error);
      });
    }

    downvoteGame(productId: string): void {
      this.http.post(`http://localhost:5000/api/votes/1/${productId}/downvote`, {})
      .subscribe(response => {
        this.product.downvotes++;
      }, error => {
        console.log(error);
      });
    }


}
