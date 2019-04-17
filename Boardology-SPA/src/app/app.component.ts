import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from './_services/product.service';
import { Product } from './_models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Boardology';
  jwtHelper = new JwtHelperService();
  products: Product[];

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      products => {
        this.productService.products = products[0];
      },
      error => {
        console.log(error);
      }
    );
  }
}
