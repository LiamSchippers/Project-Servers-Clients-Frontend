import Route from '@ember/routing/route';
import isAuthenticatedMixin from "../../mixins/authentication-route-mixin";

export default Route.extend(isAuthenticatedMixin, {
  model () {
    return this.store.createRecord('classroom');
  },
  actions: {
    saveModel() {
      this.currentModel.save();
      this.transitionTo('classrooms');
    }
  }
});
