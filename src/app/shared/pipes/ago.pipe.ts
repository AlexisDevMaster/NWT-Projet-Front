import { Pipe, PipeTransform } from '@angular/core';
import {count} from 'rxjs/operators';

@Pipe({
  name: 'ago'
})
export class AgoPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }


}
