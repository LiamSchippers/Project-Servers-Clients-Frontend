import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  session: inject(),

  actions: {
    login(email, password) {
      let session = this.get('session');
      session.authenticate('authenticator:application', email, password)
        .catch((reason) => {
          this.set('errorMessage', reason.errors[0].detail);
        })
        .then(() => {
          this.store.findRecord('ExtendedUser', session.data.authenticated.userId).then(function(user) {
            session.set('data.role', user.data.role);
            session.set('data.currentUser', user.data);
          });

          this.set('password', '');
          this.set('email', '');
          this.transitionToRoute('index');
        });
    }
  }
});
