import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

function formatDate() {
  const today = new Date;
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '-' + mm + '-' + yyyy;
}

export default Controller.extend({
  store: service(),
  studentgroups: computed(function() {
    return this.get('store').findAll('studentgroup');
  }),
  classrooms: computed(function() {
    return this.get('store').findAll('classroom');
  }),
  actions: {
    selectStudentGroup: function (studentgroup) {
      console.log(studentgroup);
      this.get('model').set('studentgroup', studentgroup);
    },
    selectClassroom: function (classroom) {
      this.get('model').set('classroom', classroom);
    },
    selectStartHour: function (startHour) {
      this.get('model').set('startHour', startHour);
    },
    selectEndHour: function (endHour) {
      this.get('model').set('endHour', endHour);
    },
    selectDay: function (day) {
      this.get('model').set('day', day);
    },
    saveModel() {
      this.get('model').save();
    }
  }
});
