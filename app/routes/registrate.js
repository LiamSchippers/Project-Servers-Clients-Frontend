import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('ExtendedUser');
  },
  actions: {
    signUpRoute(passwordCheck) {
      this.currentModel.save();
      this.transitionTo('index');
    }
  }
});
