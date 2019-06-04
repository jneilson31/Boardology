import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: string[] = [
    'All',
    'Adventure',
    // 'Action',
    'Board',
    'Card',
    'Childrens',
    'Dice',
    'Educational',
    // 'Expansion',
    'Exploration',
    'Humor',
    'Memory',
    // 'Miniatures',
    // 'Movies & Television',
    // 'Murder',
    'Mystery',
    'Party',
    'Sports',
    // 'Wargame',
    'Word'
    // 'Zombies',
  ];

  products: Product[];
  productSubscription: Subscription;
  token: string;
  id: string;
  model: any;

  constructor(private productService: ProductService, private route: ActivatedRoute, private authService: AuthService,
    private alertify: AlertifyService) {}

  ngOnInit() {
     this.productService.getProducts()
     .subscribe(products => {
       this.products = products;
     });
    this.token = this.route.snapshot.queryParams['token'];
    this.id = this.route.snapshot.queryParams['id'];
    if (this.token && this.id) {
      this.model = {
        token: this.token,
        id: this.id
      };
      this.authService.loginWithAutologinToken(this.model)
      .subscribe(next => {
        this.alertify.success('Logged in with autologin token!');
      }, error => {
        this.alertify.error('could not sign in with autlogin token');
      });
    }
  }
}
