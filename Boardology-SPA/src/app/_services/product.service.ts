import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../_models/product.model';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[];
  comments: Comment[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProduct(gameId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}games/${gameId}/game`);
  }

  getProducts(): Observable<any> {
    const productList = this.http.get<Product[]>(`${this.baseUrl}games`);

    if (!this.authService.loggedIn()) {
       return forkJoin([productList]);
    }

    const upvoteList = this.http.get(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/upvotes`);
    const downvoteList = this.http.get(`${this.baseUrl}votes/${this.authService.decodedToken.nameid}/downvotes`);
    return forkJoin([productList, upvoteList, downvoteList]);
  }

  getComments(gameId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.baseUrl}comments/game/${gameId}/comments`
    );
  }
}
