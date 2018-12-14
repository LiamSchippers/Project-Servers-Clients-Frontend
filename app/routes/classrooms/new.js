import Route from '@ember/routing/route';
import * as Ember from "../../../dist/assets/vendor";

export default Route.extend({
  model() {
    return this.store.createRecord('classroom');
  },
  actions: {
    saveModel() {
      Ember.set(this.currentModel, 'reservedSpots', 0);
      this.currentModel.save();
      this.transitionTo('classrooms');
    },
    willTransition(transition) {
      if (this.currentModel.isNew && !this.currentModel.isSaving) {
        transition.abort();
        this.currentModel.destroyRecord().then(() => transition.retry());
      }
    }
  }
});
