import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({

  // session: inject('session'),
  // currentUser: computed(' session', function() {
  //   return this.get('session.data.currentUser');
  // }),

  limitedReservations: computed('reservations', 'reservations.[]', function (){
    currentUser: computed('session', function () {
      return this.limitedReservations.get('session.data.currentUser');
    });
    if (this.get('size')) {
      return this.get('reservations').sortBy('day').slice(0, this.get('size'));
    } else {
      return this.get('reservations').sortBy('day');
    }
  }),
  actions: {
    // todo: alleen voor admin
    deleteReservation(reservation){
      reservation.deleteRecord();
      reservation.get('isDeleted');
      reservation.save();
    },
  }
});
