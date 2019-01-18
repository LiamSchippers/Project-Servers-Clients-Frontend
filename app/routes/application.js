import Route from '@ember/routing/route';

export default Route.extend({
  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').setLocale('nl');
  }
});
