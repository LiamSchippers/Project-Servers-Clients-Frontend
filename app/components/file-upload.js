import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  store: Ember.inject.service(),
  tagName: 'form',
  groupList: '',
  submit(event) {
    event.preventDefault();
    let classroomFile = this.element.querySelector('[name="classroom_csv"]').files[0];
    if (classroomFile) {
      this.readFileContent(classroomFile).then((textFile) => {
        let content = textFile.split('\n');
        content.shift();
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
            classRoom.save().then(() => {
              nmbClassrooms++;
              this.set('messageClassroom', "Importeren gelukt, " + nmbClassrooms + " lokalen toegevoegd");
            }).catch(() => {
              classRoom.deleteRecord();
            });
          }
        });
      });
    }else {
      this.set('messageClassroom', "Importeren gelukt, 0 lokalen toegevoegd");
    }

    let studentFile = this.element.querySelector('[name="student_csv"]').files[0];
    if (studentFile) {
      this.readFileContent(studentFile).then((textFile) => {
        let content = textFile.split('\n');
        content.shift();
        let nmbStudents = 0;
        let store = this.get('store');
        this.groupList = content;
        content.forEach((studentString) => {
          if (studentString.split(';').length > 1) {
            let student = this.get('store').createRecord('ExtendedUser');
            student.set("role", "student");
            studentString.split(';').forEach((fieldValue, index) => {
              switch (index) {
                case 1:
                  student.set("email", fieldValue + "@student.saxion.nl");
                  student.set("password", fieldValue);
                  break;
                case 2:
                  student.set("username", fieldValue);
                  student.save().then(() => {
                    nmbStudents++;
                    this.set('messageStudent', "Importeren gelukt, " + nmbStudents + " studenten toegevoegd");
                  }).catch(() => {
                    student.deleteRecord();
                    store.query('ExtendedUser', {
                      filter: {
                        where: {
                          "username": fieldValue
                        }
                      }
                    }).then((users) => {student = users.get('firstObject');});
                  });
                  break;
                default:
                  break;
              }
            });
          }
        });
        this.createOrFindGroup(store, 0);
      });
    }else{
      this.set('messageStudent', "Importeren gelukt, 0 studenten toegevoegd");
    }

    let teacherFile = this.element.querySelector('[name="teacher_csv"]').files[0];
    if (teacherFile) {
      this.readFileContent(teacherFile).then((textFile) => {
        let content = textFile.split('\n');
        content.shift();
        let nmbTeachers = 0;

        content.forEach((teacherString) => {
          if (teacherString.split(';').length > 1) {
            let teacher = this.get('store').createRecord('ExtendedUser');
            teacher.set("role", "teacher");
            teacherString.split(';').forEach((fieldValue, index) => {
              switch (index) {
                case 2:
                  teacher.set("email", fieldValue + "@saxion.nl");
                  teacher.set("username", fieldValue);
                  teacher.set("password", fieldValue);
                  break;
                default:
                  break;
              }
            });
            teacher.save().then(() => {
              nmbTeachers++;
              this.set('messageTeacher', "Importeren gelukt, " + nmbTeachers + " docenten toegevoegd");
            }).catch(() => {
              teacher.deleteRecord();
            });
          }
        });

      });
    }else{
      this.set('messageTeacher', "Importeren gelukt, 0 docenten toegevoegd");
    }
  },
  readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  },
  createOrFindGroup(store, i){
    let split = this.groupList[i].split(';');
    if (split.length > 4) {
      let upper = this;
      store.query('studentgroup', {
        filter: {
          where: {
            "group-name": split[3]
          }
        }
      }).then(function (group) {
        group = group.get("firstObject");
        if (group) {
          upper.findUser(store, split, group, i);
        } else {
          let group = store.createRecord('studentgroup');
          group.set("groupName", split[3]);
          group.set("reservableHours", split[4]);
          group.save().then(function (group) {
            upper.findUser(store, split, group, i);
          }).catch(() => {
            group.deleteRecord();
            store.query('studentgroup', {
              filter: {
                where: {
                  "group-name": split[3]
                }
              }
            }).then((group) => {
              group = group.get("firstObject");
              if (group) {
                upper.findUser(store, split, group, i);
              }
            })
          });
        }
      });
    }
  },
  findUser(store, split, group, i){
    store.query('ExtendedUser', {
      filter: {
        where: {
          "username": split[2]
        }
      }
    }).then((users) => {
      let student = users.get('firstObject');
      if (student) {
        this.createMembership(store, group, student, i);
      }
    });
  },
  createMembership(store, group, student, i){

    let membership = store.createRecord('membership');
    membership.set("studentgroupId", group.id);
    membership.set("userId", student.id);
    membership.save().then(()=>{
      i++;
      this.set('messageMembership', "Importeren gelukt, " + i + " studenten toegevoegd aan project groepen.");
      this.createOrFindGroup(store, i);
    }).catch(()=>{
      membership.deleteRecord();
      i++;
      this.createOrFindGroup(store, i);
    });
  }
});
