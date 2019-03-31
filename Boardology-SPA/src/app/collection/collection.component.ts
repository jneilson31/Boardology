import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CollectionProduct } from '../_models/collection-product.model';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  baseUrl = environment.apiUrl;
  productCollection: CollectionProduct[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getCollection();
  }

  getCollection(): void {
     this.http.get<CollectionProduct[]>(`${this.baseUrl}games/${this.authService.decodedToken.nameid}/collection`)
     .subscribe(results => {
      this.productCollection = results;
     });
  }

  removeFromCollection(productId: number): void {
    this.http.delete(`${this.baseUrl}games/${this.authService.decodedToken.nameid}/${productId}/collection`)
      .subscribe(results => {
        this.getCollection();
      }, error => {
        console.log(error);
      });
  }
}
