import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Product } from '../../_models/product.model';
import { AlertifyService } from '../../_services/alertify.service';
import { ProductService } from '../../_services/product.service';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  options: Fuse.FuseOptions<Product> = {
    keys: ['name']
  };
  products: any;
  originalProducts: any;
  queryField: FormControl = new FormControl();
  hasSearchResults = false;
  isDoneSearching = false;
  constructor(private searchService: SearchService, private alertify: AlertifyService, private productService: ProductService) { }

  ngOnInit() {

    this.productService.getProducts()
      .subscribe(products => {
        this.originalProducts = products;
      });
    // this.searchService.search('labore');
    this.queryField.valueChanges
    .debounceTime(350)
    .distinctUntilChanged()
    .switchMap(query => this.search(query))
    .subscribe(results => {
      this.products = results;
    });

    // .subscribe(results => {
    //     this.products = results;
    //     this.hasSearchResults = this.products.length ? true : false;
    //     this.isDoneSearching = true;
    //     if (this.queryField.value === '') {
    //       this.hasSearchResults = false;
    //       this.isDoneSearching = false;
    //     }
    //   }, error => {
    //     this.alertify.error('Could not search!');
    //   });
  }

  private search(queryString: string): any {
        const fuse = new Fuse(this.originalProducts, this.options);
        const results = fuse.search(queryString);
        const myResults = new Array(results);
        return myResults;
      }


    // return this.http.get<Product[]>(this.url + queryString);
  }

