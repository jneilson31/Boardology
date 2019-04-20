import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
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

  constructor(private productService: ProductService) {}

  ngOnInit() {
     this.productService.getProducts()
     .subscribe(products => {
       this.products = products;
     });
  }
}
