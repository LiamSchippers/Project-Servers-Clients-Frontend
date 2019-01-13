import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

export default Controller.extend({
  store: service(),
  studentgroups: computed(function () {
    return this.get('store').findAll('studentgroup');
  }),
  classrooms: computed(function () {
    return this.get('store').findAll('classroom');
  }),
  availableClassrooms: computed('classrooms', 'studentgroups', function () {
    let classrooms = this.classrooms;
    let amountOfClassrooms = classrooms.then(function() {
      console.log(classrooms.get('length')+ " amount of classrooms" );
    });
    console.log("classrooms: " + classrooms);

    let studentgroups = this.studentgroups;
    let amountOfStudentGroups = studentgroups.then(function() {
      console.log(studentgroups.get('length')+ " amount of studentgroups" );
    });
    console.log("studentgroups: " + studentgroups);

    let groupname = "groupName";
    let myGroup = null;
    let availableClassrooms = null;

    //undefined but the promiseArray has items
    console.log(studentgroups[0]);
    for (let j = 0; j < amountOfStudentGroups; j++) {
      console.log("studentgroup " + j + ": " + studentgroups[j].groupName);
      if (studentgroups[j].groupName === groupname) {
        myGroup = studentgroups[j];
        console.log("myGroup: " + myGroup);
      }
    }
    if (myGroup != null) {
      for (let i = 0; i < amountOfClassrooms; i++) {
        if (classrooms[i].availableSpots >= myGroup.amountOfGroupMembers) {
          this.store.query('classroom', {
            filter: {
              roomNumber: classrooms[i].roomNumber
            }
          }).then(function (classroom) {
            availableClassrooms.push(classroom);
          });
        }
      }
      if (availableClassrooms != null) {
        return availableClassrooms;
      } else {
        return classrooms;
      }
    }
  })
});
