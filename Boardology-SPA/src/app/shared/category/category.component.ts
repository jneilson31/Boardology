import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() product: Product;
  @Input() category: string;

  constructor() { }

  ngOnInit() {
  }
  

}
