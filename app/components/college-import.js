import Component from '@ember/component';
import {inject} from '@ember/service';

export default Component.extend({
  store: inject(),
  tagName: 'form',
  submit(event){
    event.preventDefault();
    let collegeFile = this.element.querySelector('[name="college_csv"]').files[0];
    if (collegeFile){
      if (collegeFile) {
        this.readFileContent(collegeFile).then((textFile) => {
          let content = textFile.split('\n');
          content.shift();
          let nmbCollege = 0;
          let store = this.get('store');

          content.forEach((collegeString) => {
            if (collegeString.split(';').length > 1) {
              let college = this.store.createRecord('reservation');
              let collegeSplit = collegeString.split(';');
              college.set("day", collegeSplit[0]);
              college.set("startHour", collegeSplit[1]);
              college.set("endHour", collegeSplit[2]);
              college.set("label", collegeSplit[4]);
              college.set("isCollege", true);

              this.store.query('classroom', {
                filter: {
                  where: {
                    "room-number": collegeSplit[3]
                  }
                }
              }).then(function (classrooms) {
                let classroom = classrooms.get('firstObject');
                console.log(classroom.id);
                college.set("classroom", classroom);

                store.query('studentgroup', {
                  filter: {
                    where: {
                      "groupName": "Saxion"
                    }
                  }
                }).then(function (groups) {
                  let group = groups.get('firstObject');
                  college.set("studentgroup", group);

                  college.save().then(() => {
                    nmbCollege++;
                    this.set('message', "Importeren gelukt, " + nmbCollege + " colleges toegevoegd");
                  }).catch(() => {
                    college.deleteRecord();
                  });
                });
              });
            }
          });
        });
      }else {
        this.set('messageClassroom', "Importeren mislukt, 0 colleges toegevoegd");
      }
    }
  },readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  }
});
