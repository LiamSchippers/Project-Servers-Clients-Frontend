import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const classroom = this.store.findAll('classroom');
    console.log(classroom[0]);
    return classroom;
  }
});
