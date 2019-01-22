import Route from '@ember/routing/route';
import isAuthenticatedMixin from '../../mixins/authentication-route-mixin';

export default Route.extend(isAuthenticatedMixin, {
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
