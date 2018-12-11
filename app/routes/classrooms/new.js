import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.store.createRecord('classroom');
  },
  actions: {
    saveModel() {
      console.log("hij komt hier");
      this.currentModel.save();
      this.transitionTo('classrooms');
    }
  }
});
