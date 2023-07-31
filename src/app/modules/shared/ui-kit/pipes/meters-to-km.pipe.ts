import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToKm'
})
export class MetersToKmPipe implements PipeTransform {

  transform(value: number): number {
    const kilometers = value / 1000;
    return kilometers
  }

}
