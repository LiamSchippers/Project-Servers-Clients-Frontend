import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    expandGroup() {
      this.toggleProperty('showGroupMembers');
    }
  }
});
