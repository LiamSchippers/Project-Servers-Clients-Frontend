import Component from '@ember/component';
import {computed} from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  session: inject(),
  store: inject(),
  currentUser: computed('session.data.authenticated.userId', function () {
    return this.get('store').find('extended-user', this.get('session.data.authenticated.userId'));
  }),
  actions: {
    expandGroup(membership) {
      membership.toggleProperty('showGroupMembers');
    }
  }
});
