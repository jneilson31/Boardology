import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../_models/product.model';

@Pipe({
  name: 'boardCategorySort',
})

export class BoardCategorySortPipe implements PipeTransform {

  transform(product: Product[]): any {
    return product.filter(product => product.category === "Board");

  }

}
