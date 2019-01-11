import Controller from '@ember/controller';
import EmberObject from '@ember/object';


export default Controller.extend({
  actions: {

      filterByStudent(param) {
        if (param !== '') {
          return this.store.query('extended-user', {
            filter: {
              where: {
                username: {ilike: '%' + param + '%'},
                realm: 'student'
              }
            }
          })
        } else {
          return this.store.query('extended-user', {
            filter: {
              where: {
                realm: 'student'
              }
            }
          })
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
        membership.save();


        //
        // console.log(student);

        // model.memberships.pushObject(membership);
        // this.store.commit();
        // console.log(model);

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
