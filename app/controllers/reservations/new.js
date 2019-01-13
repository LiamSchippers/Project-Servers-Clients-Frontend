import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

export default Controller.extend({
  store: service(),
  studentgroups: computed(function () {
    return this.get('store').findAll('studentgroup');
  }),
  classrooms: computed(function () {
    return this.get('store').findAll('classrooms');
  }),
  availableClassrooms: computed('classrooms', 'studentgroups', function () {
    let classrooms = this.classrooms;
    console.log("classrooms: " + classrooms);
    let studentgroups = this.studentgroups;
    console.log("studentgroups: " + studentgroups);
    let groupname = "hoi";
    let myGroup = null;
    let availableClassrooms = null;
    for (let j = 0; j < studentgroups.size(); j++) {
      console.log("studentgroup " + j + ": " + studentgroups[j].groupName);
      if (studentgroups[j].groupName === groupname) {
        myGroup = studentgroups[j];
        console.log("myGroup: " + myGroup);
      }
    }
    if (myGroup != null) {
      for (let i = 0; i < classrooms.size(); i++) {
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
