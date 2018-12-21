import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  session: inject('session'),
  actions: {
    toggleUserDropdown() {
      this.toggleProperty('dropdownOpen');
    },
    logOut() {
      this.get('session').invalidate();
    }
  }
});
