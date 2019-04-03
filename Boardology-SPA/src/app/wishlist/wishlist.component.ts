import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlist
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onGetWishlist() {
    return this.http.get(`http://localhost:5000/api/Games/{userId}/wishlist`);
  }

}
