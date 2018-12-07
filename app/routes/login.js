import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),

  actions: {
    login(email, password) {
      this.get('session').authenticate('authenticator:application', email, password);
    }
  }
});
