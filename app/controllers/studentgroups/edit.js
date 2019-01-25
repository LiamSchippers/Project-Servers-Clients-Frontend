import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import { setDiff } from '@ember/object/computed';
import { inject } from '@ember/service';
import { A } from '@ember/array';


import MutableArray from '@ember/array/mutable';

// TODO : TEACHER AUTH

export default Controller.extend({
  filter: '',
  store: inject(),
  membershipsInGroup: computed('model.memberships', function () {
    return this.get('model.memberships');
  }),
  studentsInGroup: computed('model.memberships', function () {

    let students = [];
    this.get('model.memberships').forEach(function (membership) {
      //console.log(membership.get('user').get('_belongsToState.canonicalState.id'))
      students.push(membership.get('user'));
    });
    return students;
  }),
  allStudents: computed(function() {
    //console.log(this.studentsInGroup.length);
    return this.get('store').query('extended-user', {
      filter: {
        where: {
          role: 'student'
        }
      }
    }).then(function (students) {
      console.log('students ' + students)
      return students;
      // console.log(students)
      // let allStudents = [];
      // students.forEach(function (student) {v
      //
      //   allStudents.push(student);
      // });
      // return allStudents;
    });
  }),
  studentsNotInGroup: computed('allStudents', 'studentsInGroup'  , function() {
    // console.log(this.allStudents);
    // console.log(this.allStudents.length);
    console.log('studentsInGroup ' + this.studentsInGroup.length);
    console.log('allstudents ' + this.allStudents.length);
    console.log(this.allStudents);
    // for(let i = 0; i < this.allStudents.length; i++)
    // {
    //
    // }
    //console.log(this.studentsInGroup)
    // console.log(setDiff('allStudents', 'studentsInGroup'));

    // console.log(this.allStudents);
    // console.log(this.studentsInGroup)
    // console.log(setDiff('allStudents', 'studentsInGroup'));
  }),
  filteredStudentsNotInGroup: [],
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
        }).then(function (students) {
          // filter students based on already present ones.
          var freeStudents = students.toArray();

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
          // filter students based on already present ones.
          var freeStudents = students.toArray();

          students.forEach(function (student) {
            if (model.memberships.findBy('user._belongsToState.canonicalState.id', student.get('id'))) {
              freeStudents.removeObject(student);
            }
          });
          return freeStudents;
        });
      }
    },
    addStudent(student) {
      var model = this.get('model');

      var membership = this.store.createRecord('membership', {
        studentgroupId: model.groupID,
        userId: student.userId,
        user: student,
        studentgroup: model
      });
      membership.save().catch((reason) => {
        membership.deleteRecord();
      });
    },
    removeStudent(membership) {
      membership.deleteRecord();
      membership.get('isDeleted');
      membership.save();
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
