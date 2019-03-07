import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  games: Product[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.http.get<Product[]>("http://localhost:5000/api/games")
    .subscribe(games => {
      this.games = games;
    });

  }

}
