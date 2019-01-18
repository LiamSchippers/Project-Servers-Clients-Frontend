import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.find('classroom', params.classroom_id)},
  actions: {
    setAvailability(){
      for (let i = 1; i <= 12; i++) {
        console.log(Ember.$('#'+ i).value);
      }
    }
  }
});
