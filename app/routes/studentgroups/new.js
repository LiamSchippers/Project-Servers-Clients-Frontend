import Route from '@ember/routing/route';
import isAuthorizedTeacherMixin from '../../mixins/authorization-teacher-route-mixin';

export default Route.extend(isAuthorizedTeacherMixin, {


  //return create record model of studentgroup.
  model() {
    return this.store.createRecord('studentgroup');
  },

  actions: {
    saveModel() {
      this.currentModel.save().then(() => {
        this.transitionTo('studentgroups.show',this.currentModel.id);
      })
    },
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
