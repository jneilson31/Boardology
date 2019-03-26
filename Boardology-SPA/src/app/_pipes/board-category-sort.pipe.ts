import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';

@Pipe({
  name: 'categorySort',
})

export class CategorySortPipe implements PipeTransform {

  transform(products: Product[], category: string): any {

    if (products) {
      products.forEach((product) => {
           product.category = product.category.toString().split(',');
      });
      console.log(products);
      return products.filter(product => product.category.includes(category.toLowerCase()));
    }
  }

}
