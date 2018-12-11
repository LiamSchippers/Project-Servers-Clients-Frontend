import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  session: inject('session'),

  actions: {
    logOut() {
      this.get('session').invalidate();
    }
  }
});
