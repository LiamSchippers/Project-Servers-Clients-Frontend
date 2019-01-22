import DS from 'ember-data';

export default DS.Model.extend({
  roomNumber: DS.attr('string'),
  capacity: DS.attr('number'),
  reservations: DS.hasMany('reservation'),
  reservedSpots: DS.attr('number'),

  availableSpots: computed('capacity', 'reservedSpots', function () {
    return this.capacity - this.reservedSpots;
  })
});
