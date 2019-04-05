import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../_models/product.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Upvote } from '../../_models/upvote.model';
import { Downvote } from '../../_models/downvote.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  products: Product[];
  upvotes: Upvote[];
  downvotes: Downvote[];
  max = 20;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.products = data['products'][0];
      this.upvotes = data['products'][1];
      this.downvotes = data['products'][2];
    });
  }

  viewMore(): void {
    this.max = this.max + 20;
  }

  scrollToTop(): void {
    window.scroll(0, 0);
  }

}
