import DS from 'ember-data';

export default DS.Model.extend({
  roomNumber: DS.attr('string'),
  capacity: DS.attr('number'),
  reservations: DS.hasMany('reservation'),
  availableSpots: DS.attr('number'),
});
