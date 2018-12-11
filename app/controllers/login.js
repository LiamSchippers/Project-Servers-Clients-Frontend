import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  session: inject(),

  actions: {
    login(email, password) {
      this.get('session').authenticate('authenticator:application', email, password)
        .catch((reason) => {
          this.set('errorMessage', reason.errors[0].detail);
        })
        .then(() => {
          this.transitionToRoute('index');
        });
    }
  }
});
