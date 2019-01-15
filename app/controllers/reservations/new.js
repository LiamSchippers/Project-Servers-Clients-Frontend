import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
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
  studentgroupId: null,
  startHour: null,
  classroomId: null,
  store: service(),
  studentgroups: computed( function() {
    return this.get('store').findAll('studentgroup');
  }),
  classrooms: computed( function() {
    return this.get('store').findAll('classroom');
  }),
  actions: {
    selectStudentGroup: function(selected) {
      this.set('studentgroupId', selected);
    },
    selectClassroom: function(selected) {
      this.set('classroomId', selected);
    },
    selectStartHour: function(selected) {
      this.set('startHour', selected);
    },
    selectEndHour: function(selected) {
      this.set('endHour', selected);
    },
    selectBuilding: function(selected) {
      this.set('building', selected);
    },
    selectDay: function(selected){
      this.set('day', selected);
    },
    saveModel() {
      const model = this.get('model');
      const store = this.get('store');

      
      const date = model.get('day');
      const startHour = model.get('startHour');
      const endHour = model.get('endHour');
      console.log('startuur: '+startHour + ' einduur: '+ endHour);
      console.log(date);


      const studentGroupId = this.get('studentgroupId');
      const classroomId = this.get('classroomId');
      store.findRecord('studentgroup', studentGroupId).then(function(studentGroup) {
        store.findRecord('classroom', classroomId).then(function(classroom) {
          model.set('studentgroup', studentGroup);
          model.set('classroom', classroom);
          model.save();
        })
    });
    }
  },
});
