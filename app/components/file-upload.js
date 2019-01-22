import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  store: Ember.inject.service(),
  tagName: 'form',

  submit(event) {
    event.preventDefault();
    let classroomFile = this.element.querySelector('[name="classroom_csv"]').files[0];
    this.readFileContent(classroomFile).then((textFile) => {
      let content = textFile.split('\n');
      let fieldNames = content.shift().split(';');
      let nmbClassrooms = 0;

      content.forEach((classRoomString) => {
        if (classRoomString.split(';').length > 1) {
          let classRoom = this.get('store').createRecord('classroom');
          classRoomString.split(';').forEach((fieldValue, index) => {
            switch (index) {
              case 0:
                classRoom.set("roomNumber", fieldValue);
                break;
              case 1:
                classRoom.set("building", fieldValue);
                break;
              case 2:
                classRoom.set("capacity", fieldValue);
                break;
              case 3:
                classRoom.set("mainClassroomType", fieldValue);
                break;
              case 4:
                classRoom.set("kind", fieldValue);
                break;
              case 5:
                classRoom.set("type", fieldValue);
                break;
              default:
                break;
            }
          });
          nmbClassrooms++;
          classRoom.save();
        }
      });
      this.set('messageClassroom', "Importeren gelukt, " + nmbClassrooms + " lokalen toegevoegd");
    });

    let studentFile = this.element.querySelector('[name="student_csv"]').files[0];
    this.readFileContent(studentFile).then((textFile) => {
      let content = textFile.split('\n');
      let fieldNames = content.shift().split(';');
      let nmbStudents = 0;

      content.forEach((studentRoomString) => {
        if (studentRoomString.split(';').length > 1) {
          let student = this.get('store').createRecord('ExtendedUser');
          student.set("role", "student");
          student.set("password", "password");
          studentRoomString.split(';').forEach((fieldValue, index) => {
            switch (index) {
              case 1:
                student.set("email", fieldValue + "@student.saxion.nl");
                break;
              case 2:
                student.set("username", fieldValue);
                break;
              default:
                break;
            }
          });
          nmbStudents++;
          student.save();
        }
      });
      this.set('messageStudent', "Importeren gelukt, " + nmbStudents + " studenten toegevoegd");
    });

    // let teacherFile = this.element.querySelector('[name="teacher_csv"]').files[0];
    // this.readFileContent(teacherFile).then((textFile) => {
    //   let content = textFile.split('\n');
    //   let fieldNames = content.shift().split(';');
    //   let nmbTeachers = 0;
    //
    //   content.forEach((teacherString) => {
    //     if (teacherString.split(';').length > 1) {
    //       let teacher = this.get('store').createRecord('ExtendedUser');
    //       teacher.set("role", "teacher");
    //       teacherString.split(';').forEach((fieldValue, index) => {
    //         switch (index) {
    //           case 1:
    //             teacher.set("email", fieldValue + "@student.saxion.nl");
    //             break;
    //           case 2:
    //             teacher.set("username", fieldValue);
    //             break;
    //           default:
    //             break;
    //         }
    //       });
    //       nmbTeachers++;
    //       teacher.save();
    //     }
    //   });
    //   this.set('message', "Importeren gelukt, " + nmbTeachers + " docenten toegevoegd");
    // });

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
