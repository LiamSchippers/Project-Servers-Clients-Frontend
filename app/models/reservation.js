import DS from 'ember-data';

export default DS.Model.extend({
  day: DS.attr("string"),
  startHour: DS.attr("number"),
  endHour: DS.attr("number"),
  label: DS.attr("string"),
  building: DS.attr("string"),
  floor: DS.attr("number"),
  roomNumber: DS.attr("number"),
  studentgroupId: DS.attr("number"),
  classroomId: DS.attr("number"),
});
