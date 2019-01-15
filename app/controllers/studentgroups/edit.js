import Controller from '@ember/controller';
import isAuthenticatedMixin from "../../mixins/authentication-route-mixin";
import isAuthorizedTeacherMixin from "../../mixins/authorization-teacher-route-mixin";

// TODO : TEACHER AUTH

export default Controller.extend(isAuthenticatedMixin, isAuthorizedTeacherMixin, {
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
          }).then(function(students){
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
                realm: 'student'
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
        membership.save();
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
