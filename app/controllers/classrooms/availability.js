import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    selectStartHour: function (startHour) {
      this.get('model').set('startHour', startHour);
    },
    selectEndHour: function (endHour) {
      this.get('model').set('endHour', endHour);
    }
  }
});
