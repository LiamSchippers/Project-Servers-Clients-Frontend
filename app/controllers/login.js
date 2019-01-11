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
          // TODO: rol ophalen
          session.set('data.role', 'teacher');
          //session.set('currentUser', currentUser);
          this.set('password', '');
          this.set('email', '');
          this.transitionToRoute('index');
        });
    }
  }
});
