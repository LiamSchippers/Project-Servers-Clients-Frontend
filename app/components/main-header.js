import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggleUserDropdown() {
      this.toggleProperty('dropdownOpen');
    }
  }
});
