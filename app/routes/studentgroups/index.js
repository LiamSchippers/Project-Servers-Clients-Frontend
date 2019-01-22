import Route from '@ember/routing/route';
import isAuthorizedTeacherMixin from '../../mixins/authorization-teacher-route-mixin';

export default Route.extend(isAuthorizedTeacherMixin, {
  model() {
    return this.store.findAll('studentgroup');
  }
});
