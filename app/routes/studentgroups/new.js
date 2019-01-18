import Route from '@ember/routing/route';

// TODO : TEACHER AUTH

export default Route.extend({


  //return create record model of studentgroup.
  model() {
    return this.store.createRecord('studentgroup');
  },

  actions: {
    cancelModel() {
      this.currentModel.destroyRecord().then(() => {
        this.transitionTo('studentgroups.index')
      })
    },
    willTransition(transition) {
      if (this.currentModel.isNew && !this.currentModel.isSaving) {
        transition.abort();
        this.currentModel.destroyRecord().then(() => transition.retry());
      }
    }
  }
});
