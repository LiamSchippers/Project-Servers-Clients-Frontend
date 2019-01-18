import Controller from '@ember/controller';

import MutableArray from '@ember/array/mutable';

// TODO : TEACHER AUTH

export default Controller.extend({
  actions: {

      filterByStudent(param) {
        var model = this.get('model');
        if (param !== '') {
          return this.store.query('extended-user', {
            filter: {
              where: {
                username: {ilike: '%' + param + '%'},
                role: 'student'
              }
            }
          }).then(function(students) {
            // filter students based on already present ones.
            var freeStudents = students.toArray();

            students.forEach(function(student){
              if (model.memberships.findBy('user._belongsToState.canonicalState.id', student.get('id'))){
                freeStudents.removeObject(student);
              }
            });
            return freeStudents;
          });
        } else {
          return this.store.query('extended-user', {
            filter: {
              where: {
                role: 'student'
              }
            }
          }).then(function(students){
            // filter students based on already present ones.
            var freeStudents = students.toArray();

            students.forEach(function(student){
              if (model.memberships.findBy('user._belongsToState.canonicalState.id', student.get('id'))){
                freeStudents.removeObject(student);
              }
            });
            return freeStudents;
          });
        }
      },
      addStudent(student) {
        var model = this.get('model');

        var membership = this.store.createRecord('membership',{
          studentgroupId: model.groupID,
          userId: student.userId,
          user: student,
          studentgroup: model
        });
        membership.save().catch((reason) => {
          membership.deleteRecord();
        });
      },
      goBack() {
        var model = this.get('model');
        this.transitionToRoute('studentgroups.show', model.id);
      },
    willTransition(transition) {
      if (this.currentModel.isNew && !this.currentModel.isSaving) {
        transition.abort();
        this.currentModel.destroyRecord().then(() => transition.retry());
      }
    }

  }
});
