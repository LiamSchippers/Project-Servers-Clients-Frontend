import { helper } from '@ember/component/helper';

export function period(params/*, hash*/) {
  return params;
}

export function getPeriodByTime() {
  
}

const periods = [
  {
    hourNumber: 1,
    startHour: 510,
    endHour: 555,
  }, {
    hourNumber: 2,
    startHour: 555,
    endHour: 600,
  }, {
    hourNumber: 3,
    startHour: 615,
    endHour: 660,
  }, {
    hourNumber: 4,
    startHour: 660,
    endHour: 705,
  }, {
    hourNumber: 5,
    startHour: 705,
    endHour: 750,
  }, {
    hourNumber: 6,
    startHour: 750,
    endHour: 795,
  }, {
    hourNumber: 7,
    startHour: 795,
    endHour: 840,
  }, {
    hourNumber: 8,
    startHour: 840,
    endHour: 885,
  }, {
    hourNumber: 9,
    startHour: 900,
    endHour: 945,
  }, {
    hourNumber: 10,
    startHour: 945,
    endHour: 990,
  }, {
    hourNumber: 11,
    startHour: 990,
    endHour: 1035,
  }, {
    hourNumber: 12,
    startHour: 1035,
    endHour: 1080,
  }, {
    hourNumber: 13,
    startHour: 1095,
    endHour: 1140,
  }, {
    hourNumber: 14,
    startHour: 1140,
    endHour: 1185,
  }, {
    hourNumber: 15,
    startHour: 1200,
    endHour: 1245,
  }, {
    hourNumber: 16,
    startHour: 1245,
    endHour: 1290,
  },
];

export default helper(period);
