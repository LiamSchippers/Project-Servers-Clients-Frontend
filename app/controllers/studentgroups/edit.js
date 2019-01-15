import Controller from '@ember/controller';

// TODO : TEACHER AUTH

export default Controller.extend({
  actions: {

      filterByStudent(param) {
        if (param !== '') {
          return this.store.query('extended-user', {
            filter: {
              where: {
                username: {ilike: '%' + param + '%'},
                role: 'student'
              }
            }
          }).then(function(students) {
            return students;
          });
        } else {
          // this filter gives an empty includes array, no idea why
          // filter: {
          //   include: "memberships",
          //   where: {
          //     realm: 'student'
          //   }
          // }
          return this.store.query('extended-user', {
            filter: {
              where: {
                role: 'student'
              }
            }
          }).then(function(students){
            return students;
          });
        }
      },
      addStudent(student) {
        var model = this.get('model');

        var membership = this.store.createRecord('membership',{
          studentgroupId: model.groupID,
          userId: student.userId,
          user: student,
          studentgroup: model
        });
        membership.save().catch((reason) => {
          membership.deleteRecord();
        });
      },
      goBack() {
        var model = this.get('model');
        this.transitionToRoute('studentgroups.show', model.id);
      },
    willTransition(transition) {
      if (this.currentModel.isNew && !this.currentModel.isSaving) {
        transition.abort();
        this.currentModel.destroyRecord().then(() => transition.retry());
      }
    }

  }
});
