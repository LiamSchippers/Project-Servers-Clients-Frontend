import {helper} from '@ember/component/helper';
import {Periods} from 'webroombooking-ui-test/constants'


export function startHourString([number, ...rest]) {
  for (let i = 0; i < Periods.length; i++) {
    if (number == Periods[i].hourNumber) {
      return Periods[i].startHourString;
    }
  }
  return "";
}

export default helper(startHourString);
