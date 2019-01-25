import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  day: DS.attr("string"),
  startHour: DS.attr("number"),
  endHour: DS.attr("number"),
  label: DS.attr("string"),

  // Relations
  classroom: DS.belongsTo("classroom"),
  studentgroup: DS.belongsTo("studentgroup"),

  // Computed
  duration: computed('endHour', 'startHour', function() {
    return this.endHour - this.startHour;
  }),
});
