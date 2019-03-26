import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';

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
    'Word',
    // 'Zombies',
  ];

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts()
    .subscribe(products => {
      this.products = products;
    }, error => {
      console.log(error);
    });
  }

}
