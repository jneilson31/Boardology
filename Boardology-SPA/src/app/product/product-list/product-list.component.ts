import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../_models/product.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Upvote } from '../../_models/upvote.model';
import { Downvote } from '../../_models/downvote.model';
import { AuthService } from '../../_services/auth.service';
import { forkJoin } from 'rxjs';
import { SeoService } from 'src/app/_services/seo.service';
import { ProductService } from 'src/app/_services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  })

export class ProductListComponent implements OnInit {
  products: Product[];
  upvotes: Upvote[];
  downvotes: Downvote[];
  descMax = 50;
  max = 20;
  baseUrl = environment.apiUrl;
  categoryLoad = false;
  currentCategory: string = "";
  categories: string[] = [
    'All',
    'Adventure',
    'Action',
    'Board',
    'Card',
    'Childrens',
    'Dice',
    // 'Educational',
    // 'Expansion',
    'Exploration',
    'Humor',
    'Memory',
    // 'Miniatures',
    // 'Movies & Television',
    'Murder',
    'Mystery',
    // 'Party',
    'Sports',
    // 'Wargame',
    'Word',
    // 'Zombies',
  ];

  constructor(private http: HttpClient,
     private route: ActivatedRoute,
     private authService: AuthService,
     private seoService: SeoService,
     private productService: ProductService ) { }

  ngOnInit() {
    this.getProductList();
    this.setSeoData();
  }

  public viewMore(): void {
    this.max = this.max + 20;
  }

  public scrollToTop(): void {
    window.scroll(0, 0);
  }

  private getProductList() {
    if (this.authService.loggedIn()) {
      const productList = this.http.get<Product[]>(`${this.baseUrl}games`);
      const upvoteList = this.http.get<Upvote[]>(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/upvotes`);
      const downvoteList = this.http.get<Downvote[]>(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/downvotes`);
      forkJoin([productList, upvoteList, downvoteList])
        .subscribe(data => {
          this.products = data[0];
          this.upvotes = data[1];
          this.downvotes = data[2];
        });
    } else {
      this.http.get<Product[]>(`${this.baseUrl}games`)
        .subscribe(products => {
          this.products = products;
        });
    }
  }

  private setSeoData(): void {
    
  }

  getCurrentCategory(): string {
    return this.productService.currentCategory || "All";
  }
  setCurrentCategory(category: string): void {
    this.productService.currentCategory = category;
    }
}
