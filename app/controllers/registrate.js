import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  model () {
    return this.store.createRecord('ExtendedUser');
  },
  actions: {
    signUp(studentNumber, name, password, password2) {
      this.post("extended_users", studentNumber, name, password)
      this.currentModel.save();
      this.transitionTo('extended_users');
    }
  }
});
