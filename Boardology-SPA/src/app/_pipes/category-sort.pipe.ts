import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../_models/product.model';

@Pipe({
  name: 'categorySort',
})

export class CategorySortPipe implements PipeTransform {

  transform(products: Product[], category: string): any {

    if (products) {
      products.forEach((product) => {
           product.category = product.category.toString().split(',');
      });
      const filteredProducts = products.filter(product => product.category.includes(category.toLowerCase()));
      const sortedProducts = filteredProducts.sort((a, b) => {
        return a.upvotes - b.upvotes;
      });
      return sortedProducts.reverse();
    }
  }

}
