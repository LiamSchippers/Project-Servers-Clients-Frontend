import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  session: inject(),
  /**
   * In some cases, access checking in #beforeModel is not sufficient.
   * Overriding #beforeModel is not a feasible options, because this also overrides other beforeModel hooks higher up
   * in the dependency tree. Using this flag, the access check in the #beforeModel hook can be disabled.
   */
  skipBeforeModelAccessCheck: false,
  beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      return transition;
    } else {
      this.transitionTo('index');
    }
  }
});
