import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.find('studentgroup', params.group_id)
  },
  saveModel() {
    // this.currentModel.save().then(() => {
    //   this.transitionTo('studentgroups.show', this.currentModel.id);
    // })
  }


});
