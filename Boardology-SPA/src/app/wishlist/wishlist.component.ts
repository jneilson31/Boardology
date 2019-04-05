import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ProductService } from '../_services/product.service';
import { WishlistProduct } from '../_models/wishlist-product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlist: WishlistProduct[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onGetWishlist() {
    return this.http.get(`http://localhost:5000/api/Games/{userId}/wishlist`);
  }

  addToWishlist() {
    
  }

}
