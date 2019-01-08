import Route from '@ember/routing/route';

function getDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;
}

function getMaxDate() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return yyyy + '-' + mm + '-' + dd;

  return;
}

export default Route.extend({
  model () {
    return this.store.createRecord('reservation');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set("minDate", getDate());
    controller.set("maxDate", getMaxDate())
  },
  actions: {
    saveModel() {
      this.currentModel.save();
      this.transitionTo('reservations');
    }
  }
});
