import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product

  constructor() { }

  ngOnInit() {
  }

  getShortenedDescription(description: string): string {
  //   if(description.length > 100) {
  //     return description.substring(0,100) + "...";

  //   } 
  //   return description;
  // }

  return description.length > 100 ? description.substring(0,100) + "..." : description;

}
}
