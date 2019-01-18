import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

export default Controller.extend({
  store: service(),
  studentgroups: computed(function() {
    return this.get('store').findAll('studentgroup');
  }),

  enableGrid : function(){
    if (this.get('model').get('endHour') !==undefined && this.get('model').get('startHour')!==undefined && this.get('model').get('day')!==undefined){
      this.set("toggleGridBlock", true);
    }
    else{
      this.set("toggleGridBlock", false);
    }
  },

  classrooms: computed(function() {
    return this.get('store').findAll('classroom');
  }),
  minHour: computed('startHour', function () {
    return this.get('startHour');
  }),
  actions: {
    selectStudentGroup: function (studentgroup) {
      this.get('model').set('studentgroup', studentgroup);
    },
    selectClassroom: function (classroom) {
      this.get('model').set('classroom', classroom);
    },
    selectStartHour: function (startHour) {
      this.set('startHour', startHour);
      this.get('model').set('startHour', startHour);

      this.enableGrid();
    },
    selectEndHour: function (endHour) {
      this.get('model').set('endHour', endHour);

      this.enableGrid()
    },
    selectDay: function (day) {
      this.get('model').set('day', day);

      this.enableGrid();
    },
    saveModel() {
      console.log(this.get('model'));
      // label definieren
      let label = this.get('model').get('day') + this.get('model').get('studentgroup').get('groupName');
      this.get('model').set('label', label);
      this.get('model').save().then((e) => {
        this.transitionToRoute('index');
      });
    }
  }
});
