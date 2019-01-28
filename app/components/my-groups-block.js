import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  memberships: computed('memberships', function() {
    return this.get('memberships');
  }),
  actions: {
    expandGroup() {
      this.toggleProperty('showGroupMembers');
    }
  }
});
