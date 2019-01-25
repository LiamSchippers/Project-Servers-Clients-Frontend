import Component from '@ember/component';
import {computed} from '@ember/object';
import {A, isArray} from '@ember/array';
import {isEmpty} from '@ember/utils';


export default Component.extend({
  hours: computed('reservations', 'reservations.[]', 'reservations.@each.startHour', function () {
    let hours =  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    this.reservations.forEach(reservation => {
      hours[reservation.get('startHour')].pushObject(reservation);
    });

    return hours;
  })
}).reopenClass({
  positionalParams: ['reservations']
});
