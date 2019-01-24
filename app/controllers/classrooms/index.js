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
  laterReservedClassrooms: Ember.computed('model', 'model.@each.reservations', 'model.@each', function () {
    let laterReservations = [];
    this.get('model').forEach(classroom => {
      classroom.get('reservations').then(reservations => {
        reservations.forEach(reservation => {
          // console.log(reservation.day);
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
          console.log(classroom.id);
          console.log(reservation.classroom.id);
            // if(classroom.id === reservation.classroom.id) {
            //   console.log("Reservation id: " + reservation.id);
            //   console.log(reservation);
            // }
        });
      });
    });

    return freeReservations;
  }),
});
