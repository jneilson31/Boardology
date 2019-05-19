import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../_models/product.model';
import { Observable, forkJoin, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[];
  comments: Comment[];
  subject = new Subject<Product[]>();
  category: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProduct(gameId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}games/${gameId}/game`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}games`);
  }

  getComments(gameId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.baseUrl}comments/game/${gameId}/comments`
    );
  }
}
