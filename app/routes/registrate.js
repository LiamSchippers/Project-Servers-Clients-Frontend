import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.store.createRecord('ExtendedUser');
  },
  actions: {
    signUpRoute(passwordCheck) {
      if (passwordCheck === this.currentModel.password) {
        this.currentModel.save();
        this.transitionTo('index');
      } else {
        console.log("Vieze tyfuslijer");
        this.transitionTo('index');
      }
    }
  }
});
