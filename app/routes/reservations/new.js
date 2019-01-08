import Route from '@ember/routing/route';

function getDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return mm + '/' + dd + '/' + yyyy;
}

export default Route.extend({
  model () {
    return this.store.createRecord('reservation');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set("minDate", getDate());
  },
  actions: {
    saveModel() {
      this.currentModel.save();
      this.transitionTo('reservations');
    }
  }
});
