import isAuthenticatedMixin from '../mixins/authentication-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(isAuthenticatedMixin, {
  model() {
    return this.store.findAll('reservation');
  }
});
