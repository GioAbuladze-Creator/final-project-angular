import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
  standalone: true
})
export class SalePipe implements PipeTransform {

  transform(value: number ): string {
    return Math.round(value)+'%';
  }

}
