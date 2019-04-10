import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Product } from '../../_models/product.model';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  products: Product[] = [];
  queryField: FormControl = new FormControl();
  hasSearchResults = false;
  isDoneSearching = false;
  constructor(private searchService: SearchService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.queryField.valueChanges
    .debounceTime(350)
    .distinctUntilChanged()
    .switchMap(query => this.searchService.search(query))
    .subscribe(results => {
        this.products = results;
        this.hasSearchResults = this.products.length ? true : false;
        this.isDoneSearching = true;
        if (this.queryField.value === '') {
          this.hasSearchResults = false;
          this.isDoneSearching = false;
        }
      }, error => {
        this.alertify.error('Could not search!');
      });
  }
}
