import DS from 'ember-data';

export default DS.Model.extend({
  roomNumber: DS.attr('string'),
  building: DS.attr('string'),
  mainClassroomType: DS.attr('string'),
  kind: DS.attr('string'),
  type: DS.attr('string'),
  capacity: DS.attr('number'),
  reservations: DS.hasMany('reservation'),
  availableSpots: DS.attr('number'),
});
