import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({

  session: inject('session'),
  // currentUser: computed(' session', function() {
  //   return this.get('session.data.currentUser');
  // }),

  limitedReservations: computed('reservations', 'reservations.[]', 'session', function (){
    const currentUser = this.get('session.data.currentUser');
    const memberships = currentUser.get('memberships');
    const groups = memberships.get('studentgroupid');
    if (this.get('size')) {
      return this.get('reservations').sortBy('day').slice(0, this.get('size'));
    } else {
      return this.get('reservations').filterBy(currentUser.get('groups'));
      //return this.get('reservations').sortBy('day');
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
