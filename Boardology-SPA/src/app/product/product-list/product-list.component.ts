import { Component, OnInit, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../_models/product.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Upvote } from '../../_models/upvote.model';
import { Downvote } from '../../_models/downvote.model';
import { AuthService } from '../../_services/auth.service';
import { forkJoin, Observable } from 'rxjs';
import { SeoService } from 'src/app/_services/seo.service';
import { ProductService } from 'src/app/_services/product.service';
import { CategorySortPipe } from 'src/app/_pipes/category-sort.pipe';
import { map, tap, take } from 'rxjs/operators';
import { elementEnd } from '@angular/core/src/render3';

export enum Sort {
  MostPopular = 'Most Popular',
  Alphabetical = 'A-Z'
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  })


export class ProductListComponent implements OnInit {
  @ViewChild('gameList') element2: ElementRef;
  products: Product[];
  allProducts: Product[];
  upvotes: Upvote[];
  downvotes: Downvote[];
  descMax = 50;
  max = 20;
  baseUrl = environment.apiUrl;
  categoryLoad = false;
  currentCategory = '';
  sortBy = 'Most Popular';
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
     private productService: ProductService,
     private renderer: Renderer2,
     private categorySortPipe: CategorySortPipe ) { }

  ngOnInit() {
    this.productService.products
    .subscribe(products => {
      this.products = products;
      this.allProducts = products;
    });
    this.getProductList();
    this.sortByMethod(Sort.MostPopular);
    this.setSeoData();
  }

  public viewMore(): void {
    this.max = this.max + 20;
  }

  public scrollToTop(): void {
    window.scroll(0, 0);
  }

  @HostListener('window:scroll', ['$event'])onWindowScroll(e) {
    const element = document.getElementById('sticky-scroll');
    if (window.pageYOffset > 196) {
      element.classList.add('sticky');
    } else {
      element.classList.remove('sticky');

    }
  }

  // Get method so we can use the enum in the html file
  public get Sort() {
    return Sort;
  }

  private getProductList() {
    // if (this.authService.loggedIn()) {
    //   const productList = this.http.get<Product[]>(`${this.baseUrl}games`);
    //   const upvoteList = this.http.get<Upvote[]>(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/upvotes`);
    //   const downvoteList = this.http.get<Downvote[]>(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/downvotes`);
    //   forkJoin([productList, upvoteList, downvoteList])
    //     .subscribe(data => {
    //       this.allProducts = data[0];
    //       this.products = data[0];
    //       this.sortByMethod(Sort.MostPopular);
    //       this.upvotes = data[1];
    //       this.downvotes = data[2];
    //     });
    // } else {
    //   this.http.get<Product[]>(`${this.baseUrl}games`)
    //     .subscribe(products => {
    //       this.products = products;
    //       this.allProducts = products;
    //       this.sortByMethod(Sort.MostPopular);
    //     });
    // }


  }

  private setSeoData(): void {

  }

  sortByMethod(method: string) {
    if (method === Sort.Alphabetical) {
      this.sortBy = method;
      this.products = this.products.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 0;
    });
    } else {
      this.sortBy = method;
      this.products = this.products.sort((a, b) => {
        if (a.upvotes < b.upvotes) {
          return 1;
        }
        if (a.upvotes > b.upvotes) {
          return -1;
        }
        return 0;
      });
    }
  }

  getCurrentCategory(): string {
    return this.productService.currentCategory || 'All';
  }
  setCurrentCategory(category: string): void {
    this.productService.currentCategory = category;
    this.products = this.categorySortPipe.transform(this.allProducts, category);
    this.sortByMethod(this.sortBy);
    }
}
