import Route from '@ember/routing/route';

// TODO: Het is netter om dit op te lossen met moment.js
function getDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;
}

// TODO: Het is netter om dit op te lossen met moment.js
function getMaxDate() {
  var today = new Date();
  today.setDate(today.getDate() + 30);
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return yyyy + '-' + mm + '-' + dd;
}


export default Route.extend({
  setupController: function (controller, model, studentgroup) {
    this._super(controller, model);
    controller.set("studentgroup", studentgroup);
    controller.set("minDate", getDate());
    controller.set("maxDate", getMaxDate());
  },

  model() {
    return this.store.createRecord('reservation');
  },

  actions: {
    willTransition(transition) {
      if (this.currentModel.isNew && !this.currentModel.isSaving) {
        transition.abort();
        this.currentModel.destroyRecord().then(() => transition.retry());
      }
    }
  }
});
