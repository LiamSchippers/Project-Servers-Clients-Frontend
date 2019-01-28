import Route from '@ember/routing/route';
import isAuthorizedTeacherMixin from '../../mixins/authorization-teacher-route-mixin';

export default Route.extend(isAuthorizedTeacherMixin, {
  model(params) {
    return this.store.find('studentgroup', params.group_id)
  },
  actions: {
    editModel() {
        this.transitionTo('studentgroups.edit', this.currentModel.userId);
    }
  }
});
