import Controller from '@ember/controller';

export default Controller.extend({
  passwordCheck: "",
  actions: {
    signUp() {
      this.send("signUpRoute", this.get('passwordCheck'));
    }
  }
});
