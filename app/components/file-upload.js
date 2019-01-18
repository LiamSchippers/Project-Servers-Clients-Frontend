import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  store: Ember.inject.service(),
  tagName: 'form',

  submit(event) {
    event.preventDefault();
    let file = this.element.querySelector('[name="csv"]').files[0];
    this.readFileContent(file).then((textFile) => {
      let content = textFile.split('\n');
      let fieldNames = content.shift().split(';');

      content.forEach((reservationString) => {
        if (reservationString.split(';').length > 1) {
          let reservation = this.get('store').createRecord('reservation');
          reservationString.split(';').forEach((fieldValue, index) => {
            let fieldName = fieldNames[index];
            if (fieldName === "day") {
              reservation.set(fieldName, new Date(fieldValue));
            }else {
              reservation.set(fieldName, fieldValue);
            }
          });
          reservation.save();
        }
      });
    });

  },
  readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  }
});
