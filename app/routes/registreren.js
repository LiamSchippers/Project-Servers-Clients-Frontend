import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    signUp() {
      alert('Hello World!');
      // this.currentModel.save();
      // this.transitionTo('users');
    }
  }
});
