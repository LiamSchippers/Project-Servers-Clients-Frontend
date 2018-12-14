import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.store.createRecord('studentgroup');
  },
  actions: {
    saveModel() {
      this.currentModel.save();
      this.transitionTo('studentgroups');
    }
  }
});
