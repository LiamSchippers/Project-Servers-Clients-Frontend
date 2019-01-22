import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';

export default Component.extend({
  limitedReservations: computed('reservations', function (){
    if (this.get('size')) {
      return this.get('reservations').sortBy('day').slice(0, this.get('size'));
    } else {
      return this.get('reservations').sortBy('day');
    }
  }),

  actions: {
    // todo: alleen voor admin
    deleteReservation(reservation){
      /*reservation.deleteRecord();
      reservation.get('isDeleted');
      reservation.save();*/
      this.delete();
    }
  }
});
