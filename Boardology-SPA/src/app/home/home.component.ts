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

  token: string;
  id: string;
  model: any;
  title = 'Discover the Best New Games | Boardology';
  description = 'Boardology helps you join the gaming community to discover, rate, and stay up to date on the latest trending games';

  constructor(private productService: ProductService, private route: ActivatedRoute, private authService: AuthService,
    private alertify: AlertifyService, private seoService: SeoService) {}

  ngOnInit() {
    this.setSeoData();
  }

  private setSeoData(): void {
    this.seoService.setTitle(this.title);
    this.seoService.addTag({name: 'description', content: this.description});
  }
}
