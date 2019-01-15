import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  session: inject('session'),
  actions: {
    toggleUserDropdown() {
      this.toggleProperty('dropdownOpen');
    },
    toggleMobileMenu() {
      this.toggleProperty('mobileMenuOpen');
    },
    logOut() {
      this.toggleProperty('dropdownOpen');
      this.get('session').invalidate();
    }
  }
});
