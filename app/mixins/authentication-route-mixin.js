import {inject} from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  session: inject(),
  /**
   * In some cases, access checking in #beforeModel is not sufficient.
   * Overriding #beforeModel is not a feasible options, because this also overrides other beforeModel hooks higher up
   * in the dependency tree. Using this flag, the access check in the #beforeModel hook can be disabled.
   */
  skipBeforeModelAccessCheck: false,
  beforeModel(transition) {
    if (!this.get('session').isAuthenticated) {
      this.transitionTo('login');
    }
    return transition;
  }
});
