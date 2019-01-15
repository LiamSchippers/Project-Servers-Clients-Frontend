import Route from '@ember/routing/route';
import isAuthenticatedMixin from '../../mixins/authentication-route-mixin';
import isAuthorizedTeacherMixin from '../../mixins/authorization-teacher-route-mixin';

// TODO : TEACHER AUTH

export default Route.extend(isAuthenticatedMixin, isAuthorizedTeacherMixin, {


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
