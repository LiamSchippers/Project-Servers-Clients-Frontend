import Route from '@ember/routing/route';

// TODO : TEACHER AUTH

export default Route.extend({
  model() {
    return this.store.findAll('studentgroup');
  }
});
