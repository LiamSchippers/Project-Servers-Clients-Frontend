import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('studentgroup', params.group_id, { reload: true });
  }
});

