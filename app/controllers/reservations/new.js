import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  store: service(),
  studentgroups: computed( function() {
    return this.get('store').findAll('studentgroup');
  }),
  classrooms: computed( function() {
    return this.get('store').findAll('classrooms');
  }),
  availableClassrooms: computed('classrooms', 'studentgroups', function() {

  })

});
