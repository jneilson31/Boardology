import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from './_services/product.service';
import { Product } from './_models/product.model';
import { Downvote } from './_models/downvote.model';
import { Upvote } from './_models/upvote.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Boardology';
  jwtHelper = new JwtHelperService();
  products: Product[];
  subject = new Subject<Product[]>();

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
