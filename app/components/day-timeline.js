import Component from '@ember/component';
import moment from 'moment';
import {computed} from '@ember/object';

export default Component.extend({
  dayReservations: computed('reservations.@each', 'matchDate', function() {
    return this.get('reservations').filter(function(item) {
      return moment(item.get('date')).isSame(moment(), 'day');
    });
  })
});
