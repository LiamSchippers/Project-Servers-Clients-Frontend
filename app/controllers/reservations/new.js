import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

export default Controller.extend({
  store: service(),
  studentgroups: computed(function () {
    return this.get('store').findAll('studentgroup');
  }),

  enableGrid: function () {
    const gridblockStatus = this.get('model').get('endHour') !== undefined && this.get('model').get('startHour') !== undefined && this.get('model').get('day') !== undefined;
    this.set("toggleGridBlock", gridblockStatus);
  },
  minEndHour: computed('startHour', function () {
    const startHour = +this.get('model').get('startHour') + 1;
    let options = [];
    const times = ["08:30", "09:15", "10:15", "11:00", "11:45", "12:30", "13:15", "14:00", "15:00",
      "15:45", "16:30", "17:15", "18:15", "19:00", "20:00", "20:45", "21:30"];
    for (let i = startHour - 1; i < times.length; i++) {
      options.push({value: i, time: times[i]});
    }
    return options;
  }),
  errorMessage: computed('errorMessageText', function() {
      return this.get('errorMessageText');
  }),
  classrooms: computed(function () {
    return this.get('store').findAll('classroom');
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
      const studentGroup = this.get('model').get('studentgroup');
      const maxReservableHours = studentGroup.get('reservableHours');
      const reservedHours = this.get('model').get('endHour') - this.get('model').get('startHour');
      if(maxReservableHours >= reservedHours) {
        const reservationLabel = studentGroup.get('groupName') + this.get('model').get('day');
        this.get('model').set('label', reservationLabel);
        this.get('model').save().then((e) => {
          this.transitionToRoute('index');
        });
      } else {
        this.set('errorMessageText', "Het maximale aantal les uren dat je met deze groep per keer mag boeken is " + maxReservableHours);
      }
    }
  }
});
