import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { SeoService } from '../_services/seo.service';

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
  title = 'Discover the Best New Games | Boardology';
  description = 'Boardology helps you join the gaming community to discover, rate, and stay up to date on the latest trending games';

  constructor(private productService: ProductService, private route: ActivatedRoute, private authService: AuthService,
    private alertify: AlertifyService, private seoService: SeoService) {}

  ngOnInit() {
    this.getProducts();
    this.checkForAutoLogin();
    this.setSeoData();
  }

  private checkForAutoLogin() {
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

  private getProducts() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  private setSeoData(): void {
    this.seoService.setTitle(this.title);
    this.seoService.addTag({name: 'description', content: this.description});
  }
}
