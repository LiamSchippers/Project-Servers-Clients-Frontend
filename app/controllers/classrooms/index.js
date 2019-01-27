import Controller from '@ember/controller';

export default Controller.extend({
  /**
   * The code below almost works, but is commented out because is does not works correctly
   * The first variable should be a list of rooms that are reserved now
   * The second variable should be a list of rooms that are reserved later the day you are using it
   * The third variable shoudd be a list of rooms that are free the whole day
   */

  // reservedClassrooms: Ember.computed('model', 'model.@each.reservations', 'model.@each', function () {
  //   let currentReservations = [];
  //   this.get('model').forEach(classroom => {
  //     classroom.get('reservations').then(reservations => {
  //       reservations.forEach(reservation => {
  //         if(reservation.now) {
  //           currentReservations.pushObject(classroom);
  //         }
  //       });
  //     });
  //   });
  //
  //   return currentReservations;
  // }),
  // laterReservedClassrooms: Ember.computed('model', 'model.@each.reservations', 'model.@each', function () {
  //   let laterReservations = [];
  //   this.get('model').forEach(classroom => {
  //     classroom.get('reservations').then(reservations => {
  //       reservations.forEach(reservation => {
  //
  //       });
  //     });
  //   });
  //   // console.log(laterReservations);
  //   return laterReservations;
  // }),
  // freeClassrooms: Ember.computed('model', 'model.@each.reservations', 'model.@each', function () {
  //   let freeReservations = [];
  //   this.get('model').forEach(classroom => {
  //     classroom.get('reservations').then(reservations => {
  //       reservations.forEach(reservation => {
  //         freeReservations.pushObject(classroom);
  //       });
  //     });
  //   });
  //
  //   return freeReservations;
  // }),
});
