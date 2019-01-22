import DS from 'ember-data';
import studentgroup from "./studentgroup";
import { computed } from '@ember/object';

export default DS.Model.extend({
  day: DS.attr("string"),
  startHour: DS.attr("number"),
  endHour: DS.attr("number"),
  label: DS.attr("string"),
  classroom: DS.belongsTo("classroom"),
  studentgroup: DS.belongsTo("studentgroup"),

  now: computed('day', 'startHour', 'endHour', function() {
    const day = this.get('day');
    return false;
  })
});
