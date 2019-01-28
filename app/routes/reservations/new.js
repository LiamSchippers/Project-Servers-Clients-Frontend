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

  // TODO: Voor de transitie naar een andere route moet je de aangemaakte reservation verwijderen als die niet opgeslagen is, anders blijft hij in de store staan.
  // Jasper heeft dit probleem eerder opgelost volgens mij (en anders wil ik wel helpen hoor) dus vraag hem eens.
});
