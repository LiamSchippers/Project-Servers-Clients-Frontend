import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  session:  service(),
  memberships: computed('session', function() {
    return this.get('session.data.currentUser').memberships;
  }),
  actions: {
    expandGroup() {
      this.toggleProperty('showGroupMembers');
    }
  }
});
