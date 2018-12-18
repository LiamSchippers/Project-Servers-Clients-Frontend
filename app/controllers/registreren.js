import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  session: inject(),

  actions: {
    signUp(studentnummer, naam, wachtwoord, wachtwoord2) {
      //TODO send to backend
    }
  }
});
