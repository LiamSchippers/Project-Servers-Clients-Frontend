import Component from '@ember/component';
import EmberObject, {computed} from '@ember/object';
import {inject} from '@ember/service';

export default Component.extend({

  session: inject('session'),
  store: inject(),

  limitedReservations: computed('reservations', 'reservations.[]', 'session', function () {
    // this.get('store').find('extended-user', this.get('session.data.authenticated.userId')).then(function(user) {
    //   console.log(user);
    // });
    // let store = this.get('store');
    // let reservations = this.get('store').find('membership', this.get('session.data.authenticated.userId')).then(function (membership) {
    //   console.log(membership.get('studentgroupid'));
    //   //return store.findAll('reservation');
    //   return store.find('reservation', membership.get('studentgroupid')).sortBy('day');
    // });
    // return reservations;

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
