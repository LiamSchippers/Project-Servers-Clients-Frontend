import Component from '@ember/component';

export default Component.extend({
  actions: {
    expandGroup() {
      this.toggleProperty('showGroupMembers');
    }
  }
});
