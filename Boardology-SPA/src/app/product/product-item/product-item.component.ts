import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../_models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Upvote } from '../../_models/upvote.model';
import { Downvote } from '../../_models/downvote.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  animations: [
    trigger('flipState', [
      state('sideB', style({
        transform: 'rotateY(180deg)'
      })),
      state('sideA', style({
        transform: 'rotateY(0)'
      })),
      transition('sideB => sideA', animate('500ms ease-out')),
      transition('sideA => sideB', animate('500ms ease-in'))
    ])
  ]
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() upvotes: any[];
  @Input() downvotes: any[];
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  isTrending: boolean;
  baseUrl = environment.apiUrl;
  cardFlip = "sideB";

  constructor(private http: HttpClient, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.isTrending = this.isProductTrending();
    this.hasUpvoted = this.isProductUpvoted();
    this.hasDownvoted = this.isProductDownvoted();
  }

    getShortenedDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

    upvoteGame(productId: string): void {
      if (!this.authService.checkLogin()) {
        return;
      }

      this.http.post(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/${productId}/upvote`, {})
      .subscribe(response => {
        if (this.hasUpvoted) {
          this.product.upvotes--;
          this.hasUpvoted = false;
        } else {
          this.product.upvotes++;
          this.hasUpvoted = true;
        }
      }, error => {
        this.alertify.error(error.error);
      });
    }

    downvoteGame(productId: string): void {
      if (!this.authService.checkLogin()) {
        return;
      }

      this.http.post(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/${productId}/downvote`, {})
      .subscribe(response => {
        if (this.hasDownvoted) {
          this.product.downvotes--;
          this.hasDownvoted = false;
        } else {
          this.product.downvotes++;
          this.hasDownvoted = true;
        }
      }, error => {
        this.alertify.error(error.error, 2);
      });
    }

    isProductTrending(): boolean {
      return this.isTrending = this.product.upvotes > this.product.downvotes * 2 ? true : false;
    }

    isProductUpvoted(): boolean {
      if (!this.authService.loggedIn()) {
        return false;
      }
      return this.upvotes.some(upvote => upvote.gameId === this.product.id);
    }

    isProductDownvoted(): boolean {
      if (!this.authService.loggedIn()) {
        return false;
      }
      return this.downvotes.some(upvote => upvote.gameId === this.product.id);
    }

  toggleFlip() {
    console.log("clicked");
    this.cardFlip = (this.cardFlip === 'sideA') ? 'sideB' : 'sideA';
  }


}
