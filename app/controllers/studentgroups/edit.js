import Controller from '@ember/controller';


// TODO : TEACHER AUTH

export default Controller.extend({
  actions: {
    /**
     * @param input as text by the user.
     * returns students based on input match and whether they are in a group or not.
     */
    filterByStudent(param) {
      let model = this.get('model');
      if (param !== '') {
        return this.store.query('extended-user', {
          filter: {
            where: {
              username: {ilike: '%' + param + '%'},
              role: 'student'
            }
          }
        }).then(function (students) {
          let freeStudents = students.toArray();

          students.forEach(function (student) {
            if (model.memberships.findBy('user._belongsToState.canonicalState.id', student.get('id'))) {
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
        }).then(function (students) {
          let freeStudents = students.toArray();

          students.forEach(function (student) {
            if (model.memberships.findBy('user._belongsToState.canonicalState.id', student.get('id'))) {
              freeStudents.removeObject(student);
            }
          });
          return freeStudents;
        });
      }
    },
    /**
     * @param student The student object
     * This methods add a student to a studentgroup by creating a new membership with userid and studentgroupid.
     */
    addStudent(student) {
      let model = this.get('model');

      let membership = this.store.createRecord('membership', {
        studentgroupId: model.groupID,
        userId: student.userId,
        user: student,
        studentgroup: model
      });
      membership.save().catch(() => {
        membership.deleteRecord();
      });
    },
    /**
     * @param membership the membership object.
     * This methods removes a student from a studentgroup by deleting membership.
     */
    removeStudent(membership) {
      membership.deleteRecord();
      membership.get('isDeleted');
      membership.save();
    },
    /**
     * This method gets the model and goes back to /studentgroup/id:/show page.
     */
    goBack() {
      let model = this.get('model');
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
