import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  model() {
    return this.store.createRecord('classroom');
  },
  actions: {
    saveModel() {
      console.log(this);
      // console.log(this.model);
      set(this.get(model), 'reservedSpots', 0);
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
