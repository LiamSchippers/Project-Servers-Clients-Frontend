import Route from '@ember/routing/route';
import isAuthorizedAdminMixin from '../mixins/authorization-admin-route-mixin';

export default Route.extend(isAuthorizedAdminMixin, {
});
