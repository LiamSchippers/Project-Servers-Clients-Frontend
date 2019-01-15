import Route from '@ember/routing/route';
import isAuthenticatedMixin from '../../mixins/authentication-route-mixin';
import isAuthorizedTeacherMixin from '../../mixins/authorization-teacher-route-mixin';

// TODO : TEACHER AUTH

export default Route.extend(isAuthenticatedMixin, isAuthorizedTeacherMixin, {
  model() {
    return this.store.findAll('studentgroup');
  }
});

//TODO: Authorizatie: Docent
