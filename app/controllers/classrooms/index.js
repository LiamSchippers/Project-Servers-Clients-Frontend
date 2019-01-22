import Controller from '@ember/controller';

export default Controller.extend({
  reservedClassrooms: Ember.computed('model', 'model.@each.reservations', 'model.@each', function () {
    let currentReservations = [];
    this.get('model').forEach(classroom => {
      classroom.get('reservations').then(reservations => {
        reservations.forEach(reservation => {
          if (reservation.now) {
            currentReservations.pushObject(classroom);
          }
        });
      });
    });
    return currentReservations;
  }),
});
