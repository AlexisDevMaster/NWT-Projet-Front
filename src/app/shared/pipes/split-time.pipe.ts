import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';
import {SplitPipe} from './split.pipe';

@Pipe({
  name: 'splitTime'
})
export class SplitTimePipe extends SplitPipe implements PipeTransform {

  private hour: string;
  private res: string;

  transform(value: any, args?: any): any {
    // split:['T'])[1]| split: ['Z'])[0] | split:['.'])[0];
    this.res = (super.transform(value, ['T']))[1];
    this.res = (super.transform(this.res, ['Z']))[0];
    this.res = (super.transform(this.res, ['.']))[0];

    this.hour = (super.transform(this.res, [':']))[0];
    if (this.hour === '00'){
      return this.res.split(':', 3)[1] + ':' + this.res.split(':', 3)[2];
    }else{
      return this.res;
    }

  }
}
