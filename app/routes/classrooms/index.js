import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model() {
      return Ember.RSVP.hash({
          classrooms: this.store.findAll('classroom'),
          reservations: this.store.findAll('reservation')
    });
  }
});
