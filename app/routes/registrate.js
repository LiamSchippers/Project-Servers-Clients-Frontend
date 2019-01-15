import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('ExtendedUser');
  },
  actions: {
    signUpRoute(passwordCheck) {
      console.log(this.currentModel);
      if (passwordCheck === this.currentModel.password) {
        this.currentModel.save();
        this.transitionTo('index');
      }
    }
  }
});
