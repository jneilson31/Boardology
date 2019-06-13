import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/product.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger('invertArrow', [
      state('up', style({
        transform: 'rotateX(0deg)'

      })),
      state('down', style({
        transform: 'rotateX(-180deg)'
      })),
      transition('up <=> down', animate('300ms ease-in')),
    ])
  ]
})
export class CategoryComponent implements OnInit {

  @Input() category: string;
  @Input() products: Product[];
  arrowDirection = 'up';

  constructor() {}

  ngOnInit() {
  }

  toggleArrow() {
    this.arrowDirection = (this.arrowDirection === 'down') ? 'up' : 'down';
  }

  getProductName(name: string) {
    return name.replace(/\s+/g, '-').toLowerCase();
  }
}
