import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Product } from '../../product/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  games: Product[] = [];
  queryField: FormControl = new FormControl();
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.queryField.valueChanges
    .debounceTime(350)
    .distinctUntilChanged()
    .switchMap((query) => this.searchService.search(query))
    .subscribe(results => {
        this.games = results;
      });
  }

}
