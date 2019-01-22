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
  classrooms: computed('availableSpots', function () {
    //when the promise resolves return all the classrooms
    //after the promise resolves the classrooms should have the value availableSpots for the selectedStartHour
    this.availableSpots.finally(() => {
      return this.get('store').findAll('classroom');
    });
  }),
  availableSpots: computed('startHour', 'day', function () {
    const selectedStartHour = +this.get('model').get('startHour');
    const selectedDay = +this.get('model').get('day');
    let classrooms = this.get('store').findAll('classroom');

    return new Promise(function (resolve, reject) {
      classrooms.then((classrooms) => {
        //loop through all the classrooms
        //for each classroom we want to see if it has reservations for the selectedStartHour
        classrooms.forEach((classroom) => {
          let availableSpots = classroom.capacity;
          let reservations = classroom.get('reservations');
          reservations.then((reservations) => {
            //loop through all the reservations
            //for each reservation check if the selectedStartHour is between reserved times
            //if so the amount of groupmembers within the studentgroup of the reservation should be subtracted from the availableSpots
            reservations.forEach((reservation) => {
              // if the selectedDay matches the reservation day, we want to start comparing hours
              if (reservation.get('day') === selectedDay) {
                let startHour = reservation.get('startHour');
                let endHour = reservation.get('endHour');
                //if the selected startHour is within the reserved hours,
                //then we want to update the availableSpots
                if (selectedStartHour => startHour && selectedStartHour < endHour) {
                  availableSpots -= reservation.studentgroup.get('amountOfGroupMembers');
                }
              }
            });

            //after looping through all the reservations we want to set the availableSpots attribute of the classroom model
            classroom.set('availableSpots', availableSpots);
          });
        });
      });
    })
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
