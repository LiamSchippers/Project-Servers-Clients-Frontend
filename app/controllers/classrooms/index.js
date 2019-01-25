import Controller from '@ember/controller';

export default Controller.extend({
  reservedClassrooms: Ember.computed('model', 'model.@each.reservations', 'model.@each', function () {
    let currentReservations = [];
    this.get('model').forEach(classroom => {
      classroom.get('reservations').then(reservations => {
        reservations.forEach(reservation => {
          if(reservation.now) {
            currentReservations.pushObject(classroom);
          }
        });
      });
    });

    return currentReservations;
  }),
  laterReservedClassrooms: Ember.computed('model', 'model.@each.reservations', 'model.@each', function () {
    let laterReservations = [];
    this.get('model').forEach(classroom => {
      classroom.get('reservations').then(reservations => {
        reservations.forEach(reservation => {

        });
      });
    });
    // console.log(laterReservations);
    return laterReservations;
  }),
  freeClassrooms: Ember.computed('model', 'model.@each.reservations', 'model.@each', function () {
    let freeReservations = [];
    this.get('model').forEach(classroom => {
      classroom.get('reservations').then(reservations => {
        reservations.forEach(reservation => {
          freeReservations.pushObject(classroom);
        });
      });
    });

    return freeReservations;
  }),
});
