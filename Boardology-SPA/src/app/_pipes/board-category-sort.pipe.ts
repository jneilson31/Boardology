import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boardCategorySort'
})
export class BoardCategorySortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
