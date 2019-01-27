import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

export default Controller.extend({
  store: service(),
  studentgroups: computed(function () {
    return this.get('store').findAll('studentgroup');
  }),

  enableGrid: function () {
    const model = this.get('model');
    const gridblockStatus = model.get('endHour') !== undefined && model.get('startHour') !== undefined && model.get('day') !== undefined;
    this.set("toggleGridBlock", gridblockStatus);
    if (gridblockStatus) {
      this.availableSpots.finally(() => {
        return this.get('store').findAll('classroom');
      });
    }
  },
  //this class returns an array with all the classrooms that can fit all the members of the selected studentgroup
  getAvailableClassrooms: function () {
    const model = this.get('model');
    let availableClassrooms = [];
    let classrooms = this.get('store').findAll('classroom');
    let studentGroup = model.get('studentgroup');
    let studentsCount = 0;
    classrooms.then((classrooms) => {
      classrooms.forEach((classroom) => {
        let availableSpots = classroom.get('availableSpots');
        studentGroup.get('amountOfGroupMembers').then(amount => {
          studentsCount = amount;
        });
        studentGroup.get('amountOfGroupMembers').finally(() => {
          if (studentsCount <= availableSpots) {
            availableClassrooms.push(classroom);
          }
        });
      });
      return availableClassrooms;
    });
  },
  compareDates: function (reservationDate, selectedDate) {
    //comapre the date's without the time from the date object
    //split at '-' then remove the time by splitting at 'T'
    //returns true if the date's match
    let res = reservationDate.split("-");
    let resWithoutTime = res[2].split("T");
    let resDate = res[0] + res[1] + resWithoutTime[0];

    let select = selectedDate.split("-");
    let selectWithoutTime = select[2].split("T");
    let selectDate = select[0] + select[1] + selectWithoutTime[0];

    return resDate === selectDate;
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
  // method for returning available spots of all classrooms for the selected date, start- and endhour
  availableSpots: computed('startHour', 'day', function () {
    const model = this.get('model');
    const selectedStartHour = +model.get('startHour');
    const selectedDay = model.get('day');
    let classrooms = this.get('store').findAll('classroom');
    let reformedDate = new Date(selectedDay.toString().split('GMT')[0] + ' UTC').toISOString();
    let _this = this;

    return new Promise(function (resolve, reject) {
      classrooms.then((classrooms) => {
        classrooms.forEach((classroom) => {
          let availableSpots = classroom.capacity;
          classroom.set('availableSpots', availableSpots);
          let reservations = classroom.get('reservations');
          reservations.then((reservations) => {
            reservations.forEach((reservation) => {
              if (_this.compareDates(reservation.get('day'), reformedDate)) {
                let startHour = reservation.get('startHour');
                let endHour = reservation.get('endHour');
                if (selectedStartHour => startHour && selectedStartHour < endHour) {
                  reservation.studentgroup.get('amountOfGroupMembers').then(amount => {
                    availableSpots -= amount;
                  });
                  reservation.studentgroup.get('amountOfGroupMembers').finally(() => {
                    classroom.set('availableSpots', availableSpots);
                  })
                }
              }
            });
            resolve();
          });
        });
      });
    })
  }),
  actions: {
    selectStudentGroup: function (studentgroup) {
      this.get('model').set('studentgroup', studentgroup);
      this.getAvailableClassrooms();
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
          this.transitionToRoute('classrooms.show', this.get('model').get('classroom').get('id'));
        });
      } else {
        this.set('errorMessageText', "Het maximale aantal les uren dat je met deze groep per keer mag boeken is " + maxReservableHours);
      }
    }
  }
});
