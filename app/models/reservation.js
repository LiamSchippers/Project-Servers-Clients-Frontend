import DS from 'ember-data';

export default DS.Model.extend({
  day: DS.attr("date"),
  startHour: DS.attr("number"),
  endHour: DS.attr("number"),
  label: DS.attr("string"),
  building: DS.attr("string"),
  floor: DS.attr("string"),
  roomNumber: DS.attr("string"),
  studentgroup: DS.belongsTo("studentgroup"),
});
