import Controller from '@ember/controller';

// TODO : TEACHER AUTH

export default Controller.extend({
  actions: {

      filterByStudent(param) {
        var model = this.get('model');
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
          return this.store.query('extended-user', {
            filter: {
              where: {
                role: 'student'
              }
            }
          }).then(function(students){
            return students; //return all to keep it workin

            students.forEach(function(student){
              // Check if student is already present in memberships. If so don't return in list students.
              // console.log(student.get('id'));
              // console.log(student);
              // console.log(model.memberships);
              // console.log(model.memberships.findBy('id', student.get('id')))
              //
              // if (model.memberships.findBy('extended-user', student)){
              //   console.log('works')
              // }
            });
            //return students
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
