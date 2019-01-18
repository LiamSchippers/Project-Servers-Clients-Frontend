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
        let reservation = this.get('store').createRecord('reservation');
        reservationString.split(';').forEach((fieldValue, index) => {
          let fieldName = fieldNames[index];
          console.log(fieldName + " " + fieldValue);
          if (fieldName === "day"){
            reservation.set(fieldName, new Date(fieldValue));
          }
          reservation.set(fieldName, fieldValue);
        });
        console.log(reservation);
        reservation.save();
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
