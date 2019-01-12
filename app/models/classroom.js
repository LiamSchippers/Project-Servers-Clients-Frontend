import DS from 'ember-data';
import {computed} from '@ember/object';

export default DS.Model.extend({
  roomNumber: DS.attr('string'),
  capacity: DS.attr('number'),
  reservedSpots: DS.attr('number'),

  availableSpots: computed('capacity', 'reservedSpots', function () {
    return this.capacity - this.reservedSpots;
  })
});
