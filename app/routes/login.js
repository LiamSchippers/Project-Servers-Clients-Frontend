import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  session: inject(),

  skipBeforeModelAccessCheck: false,
  beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      return transition;
    } else {
      this.transitionTo('index');
    }
  }
});
