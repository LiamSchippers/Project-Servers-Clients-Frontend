import DS from 'ember-data';
import studentgroup from "./studentgroup";
import { computed } from '@ember/object';
import {Periods} from 'webroombooking-ui-test/constants'

export default DS.Model.extend({
  day: DS.attr("string"),
  startHour: DS.attr("number"),
  endHour: DS.attr("number"),
  label: DS.attr("string"),
  classroom: DS.belongsTo("classroom"),
  studentgroup: DS.belongsTo("studentgroup"),

  now: computed('day', 'startHour', 'endHour', function() {
    let date = new Date();
    let timeNow = (date.getHours() * 60) + date.getMinutes();

    Periods.forEach(function (period) {
      if (timeNow >= period.startHour && timeNow < period.endHour) {
        return true;
      }
    });

    return false;
  })
});
