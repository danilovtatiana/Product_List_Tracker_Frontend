import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leftPaddingFilter',
})
export class LeftPaddingFilterPipe implements PipeTransform {
  transform(item: string): string {
    const result = (String('0').repeat(8) + item).substring(2 * -1, 2);
    return result;
  }
}
