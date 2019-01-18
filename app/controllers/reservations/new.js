import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

function formatDate() {
  const today = new Date;
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '-' + mm + '-' + yyyy;
}

export default Controller.extend({
  store: service(),
  studentgroups: computed(function() {
    return this.get('store').findAll('studentgroup');
  }),



  classrooms: computed(function() {
    return this.get('store').findAll('classroom');
  }),
  actions: {
    selectStudentGroup: function (studentgroup) {
      console.log(studentgroup);
      this.get('model').set('studentgroup', studentgroup);
    },
    selectClassroom: function (classroom) {
      this.get('model').set('classroom', classroom);
    },
    selectStartHour: function (startHour) {
      console.log(startHour);
      this.get('model').set('startHour', startHour);

      if (this.get('model').get('endHour') !==null && this.get('model').get('startHour')!==null && this.get('model').get('day')!==null){
        this.set("toggleGridBlock", true);
      }
      else{
        this.set("toggleGridBlock", false);

      }


    },
    selectEndHour: function (endHour) {
      this.get('model').set('endHour', endHour);
      let endhour1 =this.get('model').get('endHour');
      let startHour = this.get('model').get('startHour');
      let day = this.get('model').get('day');
      console.log(endhour1);
      console.log(startHour);
      console.log(day);

      if (this.get('model').get('endHour') !==null && this.get('model').get('startHour')!==null && this.get('model').get('day')!==null){
        this.set("toggleGridBlock", true);

      }
      else{
        this.set("toggleGridBlock", false);

      }
    },
    selectDay: function (day) {
      this.get('model').set('day', day);

      if (this.get('model').get('endHour') !==null && this.get('model').get('startHour')!==null && this.get('model').get('day')!==null){
        this.set("toggleGridBlock", true);
      }
      else{
        this.set("toggleGridBlock", false);

      }
    },
    saveModel() {
      console.log(this.get('model'));
      // label definieren
      let label = this.get('model').get('day') + this.get('model').get('studentgroup').get('groupName');
      this.get('model').set('label', label);
      this.get('model').save();
    }
  }
});
