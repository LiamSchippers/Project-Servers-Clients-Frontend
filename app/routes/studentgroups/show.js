import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      studentgroup: this.store.find('studentgroup', params.group_id),
      memberships: this.store.findAll('membership')
        .then(results => results.filter((group) => {
          return group.get('studentgroupId') === params.group_id;
        })),
      students: this.store.findAll('extended-user')
        .then(results => results.filter((student) => {
          return student.get('realm') === 'student';
        }))
  })
  },
  actions: {
    // editModel() {
    //     this.transitionTo('studentgroups.edit', this.currentModel);
    // }
  }
});
// students: this.store.findAll('extended-user').then(function(students){
//   return students.filter(function(student){
//     if(student.belongsTo('membership').id() === null) {
//       console.log('yay');
//       return true;
//     }
//     else {
//       return false;
//     }
//   }).get('firstObject');
// })
