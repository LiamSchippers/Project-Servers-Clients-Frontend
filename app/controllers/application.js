import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),

  actions: {
    logOut() {
      this.get('session').invalidate();
    }
  }
});
