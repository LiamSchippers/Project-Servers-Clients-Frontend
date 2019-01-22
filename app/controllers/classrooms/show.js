import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({
  groupedReservations: computed('model.reservations','model.reservations.[]','model.reservations.@each.day', function () {
    var groups = [];

    this.get('model.reservations').forEach(function(reservation) {
      var hasType = groups.findBy('day', reservation.get('day'));

      if(!hasType) {
        groups.pushObject(Ember.Object.create({
          day: reservation.get('day'),
          contents: []
        }));
      }

      groups.findBy('day', reservation.get('day')).get('contents').pushObject(reservation);
    });

    groups.sort((a,b) => new Date(a.day) - new Date(b.day));

    return groups;
  }),
});
