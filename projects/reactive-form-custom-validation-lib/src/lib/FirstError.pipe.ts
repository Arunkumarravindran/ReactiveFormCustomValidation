import { Pipe, PipeTransform } from '@angular/core';
import { FirstErrorModel } from './firstErrorModel';

@Pipe({
  name: 'firstError',
})
export class FirstErrorPipe implements PipeTransform {
  transform(errors: any): FirstErrorModel | string {
    if (!errors) return '';
    const errorKeyFromObj = Object.keys(errors);
    if (errorKeyFromObj && errorKeyFromObj.length > 0) {
      return {
        errorKey: errorKeyFromObj[0],
        errorMessage: errors[errorKeyFromObj[0]],
      };
    } else {
      return '';
    }
  }
}
