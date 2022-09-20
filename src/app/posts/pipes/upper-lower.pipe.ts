import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperLower',
})
export class UpperLowerPipe implements PipeTransform {
  transform(value: string, upper: boolean = true): string {
    return upper ? value.toUpperCase() : value.toLowerCase();
  }
}
