import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.store.createRecord('reservation');
  },
  actions: {
    saveReservation() {
      this.currentModel.save();
      this.transitionTo('index');
    }
  }
});
