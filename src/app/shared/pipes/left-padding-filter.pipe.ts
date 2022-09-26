import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leftPaddingFilter',
  pure: false,
})
export class LeftPaddingFilterPipe implements PipeTransform {
  transform(item: string): string {
    const maxLength = 8;

    if (item[0] === '0') {
      item = item.substring(1);
    }

    let zeros = '0'.repeat(maxLength - item.length);
    const result = zeros + item;

    return result;
  }
}
