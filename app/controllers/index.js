import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    sayHi() {
      alert('Hello user!');
    }
  }
});
