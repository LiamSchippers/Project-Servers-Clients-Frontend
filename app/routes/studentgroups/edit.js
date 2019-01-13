import Route from '@ember/routing/route';

// TODO : TEACHER AUTH

export default Route.extend({
  model(params) {
    return this.store.find('studentgroup', params.group_id)
  }
});
