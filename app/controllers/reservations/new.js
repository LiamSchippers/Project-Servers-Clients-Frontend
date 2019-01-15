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
    let amountOfGroupMembers;
    let availableClassRooms = null;
    this.studentgroups.then((studentgroups)=>{
      studentgroups.forEach((studentgroup) => {
        if (studentgroup.get('groupName') === 'groupName'){
          amountOfGroupMembers = studentgroup.get('amountOfGroupMembers');
        }
      });
    this.classrooms.then((classrooms)=>{
      console.log(classrooms);
      classrooms.forEach((classroom)=>{
        let availableSpots = classroom.get('availableSpots');
        if (availableSpots >= amountOfGroupMembers){
          console.log("deze classroom kan: " + classroom);
          availableClassRooms.push(classroom);
        }
      });
      console.log("availableclassrooms: " + availableClassRooms);
    });
    });
  })
});
