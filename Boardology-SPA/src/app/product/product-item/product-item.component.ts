import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../_models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  hasUpvoted = false;
  hasDownvoted = false;
  isTrending: boolean;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.isTrending = this.isProductTrending();
  }

    getShortenedDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

    upvoteGame(productId: string): void {
      if (!this.authService.loggedIn()) {
        return;
      }
      this.http.post(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/${productId}/upvote`, {})
      .subscribe(response => {
        this.product.upvotes++;
        this.hasUpvoted = true;
      }, error => {
        console.log(error);
      });
    }

    downvoteGame(productId: string): void {
      if (!this.authService.loggedIn()) {
        return;
      }
      this.http.post(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/${productId}/downvote`, {})
      .subscribe(response => {
        this.product.downvotes++;
        this.hasDownvoted = true;
      }, error => {
        console.log(error);
      });
    }

    isProductTrending(): boolean {
      return this.isTrending = this.product.upvotes > this.product.downvotes * 2 ? true : false;
    }


}
