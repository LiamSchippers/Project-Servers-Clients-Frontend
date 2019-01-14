import DS from 'ember-data';
import studentgroup from "./studentgroup";

export default DS.Model.extend({
  day: DS.attr("string"),
  startHour: DS.attr("number"),
  endHour: DS.attr("number"),
  label: DS.attr("string"),
  building: DS.attr("string"),
  classroom: DS.belongsTo("classroom"),
  studentgroup: DS.belongsTo("studentgroup"),
});
