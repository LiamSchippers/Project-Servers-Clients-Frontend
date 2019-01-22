import Helper from '@ember/component/helper';
import {Periods} from 'webroombooking-ui-test/constants'


export default Helper.extend({
  compute([date, ...rest], hash) {
    let timeNow = (date.getHours() * 60) + date.getMinutes();

    Periods.forEach(function (period) {
      console.log(period);
      if (timeNow >= period.startHour && timeNow < period.endHour) {
        return period.hourNumber;
      }
    });
  }
});