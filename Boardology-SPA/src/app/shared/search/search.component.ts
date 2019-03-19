import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Product } from '../../_models/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  products: Product[] = [];
  queryField: FormControl = new FormControl();
  hasNoSearchResults = true;
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.queryField.valueChanges
    .debounceTime(350)
    .distinctUntilChanged()
    .switchMap((query) => this.searchService.search(query))
    .subscribe(results => {
        this.products = results;
        this.hasNoSearchResults = this.products.length ? false : true;
        if (this.queryField.value === "") {
          this.hasNoSearchResults = true;
        }
      })
  }
}
