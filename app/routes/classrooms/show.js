import Route from '@ember/routing/route';
import isAuthenticatedMixin from "../../mixins/authentication-route-mixin";

export default Route.extend(isAuthenticatedMixin, {
  model(params) {
    return this.store.find('classroom', params.classroom_id)
  }
});
