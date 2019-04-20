import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../_services/product.service';
import { WishlistProduct } from '../_models/wishlist-product.model';
import { environment } from '../../environments/environment';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  productWishlist: WishlistProduct[] = [];
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getWishlist();
  }

  getWishlist() {
    if (!this.authService.loggedIn()) {
      return;
    }
     this.http.get<WishlistProduct[]>(`${this.baseUrl}games/${this.authService.decodedToken.nameid}/wishlist`)
      .subscribe(wishlist => {
        this.productWishlist = wishlist;
      });
  }
}
