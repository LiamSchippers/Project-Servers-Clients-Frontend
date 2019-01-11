import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model() {
    this.store.findAll('classroom');
  }
});
