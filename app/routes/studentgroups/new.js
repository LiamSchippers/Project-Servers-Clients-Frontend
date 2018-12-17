import Route from '@ember/routing/route';

export default Route.extend({
  //return create record model of studentgroup.
  model () {
    return this.store.createRecord('studentgroup');
  },
  actions: {
    //Save the current model and transition to /studentgroups
    saveModel() {
      this.currentModel.save();
      this.transitionTo('studentgroups');
    }
  }
});
