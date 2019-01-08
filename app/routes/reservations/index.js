import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('reservation');
  },

  actions: {
    deleteReservation(reservation){
      reservation.deleteRecord();
      reservation.get('isDeleted');
      reservation.save();
    }
  }
});
