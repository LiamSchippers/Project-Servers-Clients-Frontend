import Route from '@ember/routing/route';

export default Route.extend({
  model() {

  // return this.transitionTo('classroom.availability',this.currentModel.id);
    return this.store.findAll('classroom');
  }
});
