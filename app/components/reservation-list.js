import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';

export default Component.extend({
  limitedReservations: computed('reservations', function (){
    return this.get('reservations').sortBy('day').slice(0, 3);
  })
});
