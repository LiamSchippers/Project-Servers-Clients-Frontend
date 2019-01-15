import DS from 'ember-data';

export default DS.Model.extend({
  day: DS.attr("date"),
  startHour: DS.attr("number"),
  endHour: DS.attr("number"),
  label: DS.attr("string"),
  studentgroup: DS.belongsTo("studentgroup"),
  classroom: DS.belongsTo("classroom"),
});
