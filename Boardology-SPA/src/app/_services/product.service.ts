import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../_models/product.model';
import { Observable, forkJoin, Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products: BehaviorSubject<Product[]>;
  baseUrl = environment.apiUrl;
  comments: Comment[];
  currentCategory: string;
  private dataStore: {  // This is where we will store our data in memory
  products: Product[]
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.dataStore = { products: [] };
    this._products = <BehaviorSubject<Product[]>>(new BehaviorSubject([]));
    this.getProducts();
  }

  get products() {
    return this._products.asObservable();
  }

    getProduct(gameId: string): Observable<Product> {
       return this.http.get<Product>(`${this.baseUrl}games/${gameId}/game`);
  }

  getProducts() {
    if (!this.dataStore.products.length) {
      this.http.get<Product[]>(`${this.baseUrl}games`)
        .subscribe(products => {
          this.dataStore.products = products;
          this._products.next(Object.assign({}, this.dataStore).products);
        }, error => console.log('could not load products'));
    } else {
      this._products.next(this.dataStore.products);
    }
  }

  updateNumberOfComments(product: Product) {
    this.http.post(`${this.baseUrl}comments/${this.authService.decodedToken.nameid}/${product.id}/comment`,
    {content: 'test content'}).subscribe((comment: Comment) => {
      console.log(comment);
        },
        error => {
          console.log(error);
        }
      );
    const index = this.dataStore.products.findIndex(product1 => product1.id === product.id);
    const numReviews = this.dataStore.products[index].numReviews + 1;

    this.dataStore.products[index] = {
      ...this.dataStore.products[index], numReviews
    };

    this._products.next(Object.assign({}, this.dataStore).products);
  }

  updateNumberOfUpvotes(product: Product) {
   // need to implement
  }

  updateNumberOfDownvotes(product: Product) {
    // need to implement
  }

  getComments(gameId: number): Observable<Comment[]> {
    // we will want to limit the number of comments we fetch unless 
    // user clicks view more OR view all. We need to decide what we want to show
    return this.http.get<Comment[]>(
      `${this.baseUrl}comments/game/${gameId}/comments`
    );
  }


}
