import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  studentgroupId: null,
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
    saveModel() {
      const model = this.get('model');
      const store = this.get('store');
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
