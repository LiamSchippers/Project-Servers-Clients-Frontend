import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      studentgroup: this.store.find('studentgroup', params.group_id),
      memberships: this.store.query('membership', {
        filter: {
          name: params.group_id
        }}),
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
      reload: true

  })
  },
  actions: {
    // editModel() {
    //     this.transitionTo('studentgroups.edit', this.currentModel);
    // }
  }
});
