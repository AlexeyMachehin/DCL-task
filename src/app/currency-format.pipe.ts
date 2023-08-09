import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value == null) {
      return '';
    }

    const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const formattedValue = formatter.format(value);
    const currencySymbol = ' ₽';

    return formattedValue
      .replace(/\s/g, '')
      .replace('RUB', ' ' + currencySymbol);
  }
}
