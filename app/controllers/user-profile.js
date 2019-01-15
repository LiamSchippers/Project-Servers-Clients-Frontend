import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    changePassword() {
      this.toggleProperty('changePassword');
    }
  }
});
