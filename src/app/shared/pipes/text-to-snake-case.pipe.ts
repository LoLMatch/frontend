import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'dsTextToSnakeCase',
  standalone: true,
})
export class TextToSnakeCasePipe implements PipeTransform {
  transform(value: string): string {
    return value?.split(' ').map((item) => item.toLowerCase()).join('_');
  }
}
