import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../_models/product.model';

@Component({
  selector: 'app-category-game',
  templateUrl: './category-game.component.html',
  styleUrls: ['./category-game.component.scss']
})
export class CategoryGameComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
