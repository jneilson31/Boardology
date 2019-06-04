import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CollectionProduct } from '../_models/collection-product.model';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  baseUrl = environment.apiUrl;
  productCollection: CollectionProduct[];

  constructor(private http: HttpClient, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getCollection();
  }

  getCollection(): void {
    if (!this.authService.loggedIn()) {
      return;
    }
      this.http.get<CollectionProduct[]>(`${this.baseUrl}collection/${this.authService.decodedToken.nameid}/collection`)
        .subscribe(results => {
          this.productCollection = results;
        });
  }

  removeFromCollection(productId: number): void {
    this.alertify.confirm('Are you sure you want remove this game from your collection?', 'Yes', undefined, () => {
      this.http.delete(`${this.baseUrl}collection/${this.authService.decodedToken.nameid}/${productId}/collection`)
        .subscribe(results => {
          const productToRemove = this.productCollection.findIndex(x => x.id === productId);
          this.productCollection.splice(productToRemove, 1);
        }, error => {
          console.log(error);
        });
    });
  }
}
