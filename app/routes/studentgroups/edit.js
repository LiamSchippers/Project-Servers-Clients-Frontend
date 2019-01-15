import Route from '@ember/routing/route';
import isAuthenticatedMixin from '../../mixins/authentication-route-mixin';
import isAuthorizedTeacherMixin from '../../mixins/authorization-teacher-route-mixin';

export default Route.extend(isAuthenticatedMixin, isAuthorizedTeacherMixin, {
  model(params) {
    return this.store.find('studentgroup', params.group_id)
  }
});
