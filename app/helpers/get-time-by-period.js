import Helper from '@ember/component/helper';
import {Periods} from 'webroombooking-ui-test/constants';

export default Helper.extend({
  compute([periodHour, ...rest], hash) {
    let startHour = null;
    Periods.forEach(function (period) {
      let hour = period.hourNumber;
      if (hour === periodHour) {
        startHour = period.startHour
      }
    });
    let hours = Math.floor(startHour/60);
    let minutes = startHour%60;
    return `${hours}:${minutes}`;
  }
});