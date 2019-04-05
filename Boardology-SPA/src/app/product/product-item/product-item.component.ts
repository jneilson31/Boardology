import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../_models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Upvote } from '../../_models/upvote.model';
import { Downvote } from '../../_models/downvote.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() upvotes: any[];
  @Input() downvotes: any[];
  hasUpvoted = false;
  hasDownvoted = false;
  isTrending: boolean;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.isTrending = this.isProductTrending();
  }

    getShortenedDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

    upvoteGame(productId: string): void {
      if (!this.authService.loggedIn()) {
        this.alertify.error('You need to be logged in to do that', 2);
        return;
      }
      this.http.post(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/${productId}/upvote`, {})
      .subscribe(response => {
        this.product.upvotes++;
        this.hasUpvoted = true;
      }, error => {
        this.alertify.error(error.error, 2);
      });
    }

    downvoteGame(productId: string): void {
      if (!this.authService.loggedIn()) {
        this.alertify.error('You need to be logged in to do that!', 2);
        return;
      }
      this.http.post(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/${productId}/downvote`, {})
      .subscribe(response => {
        this.product.downvotes++;
        this.hasDownvoted = true;
      }, error => {
        this.alertify.error(error.error, 2);
      });
    }

    isProductTrending(): boolean {
      return this.isTrending = this.product.upvotes > this.product.downvotes * 2 ? true : false;
    }

    isProductUpvoted(productId: number): boolean {
      if (!this.authService.loggedIn()) {
        return false;
      }
      console.log(this.upvotes);
      return this.upvotes.some(upvote => upvote.gameId === productId);
    }

    isProductDownvoted(productId: number): boolean {
      if (!this.authService.loggedIn()) {
        return false;
      }
      return this.downvotes.some(upvote => upvote.gameId === productId);
    }


}
