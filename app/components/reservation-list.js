import Component from '@ember/component';
import EmberObject, {computed} from '@ember/object';
import {inject} from '@ember/service';

export default Component.extend({

  session: inject('session'),
  store: inject(),

  limitedReservations: computed('reservations', 'reservations.[]', 'session', function () {
    if (this.get('size')) {
      return this.get('reservations').sortBy('day').slice(0, this.get('size'));
    } else {
      return this.get('reservations').sortBy('day');
    }
  }),
  actions: {
    // todo: alleen voor admin
    deleteReservation(reservation) {
      reservation.deleteRecord();
      reservation.get('isDeleted');
      reservation.save();
    },
  }
});
