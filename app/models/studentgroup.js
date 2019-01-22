import DS from 'ember-data';
import {computed} from '@ember/object';


export default DS.Model.extend({
  groupName: DS.attr('string'),
  reservableHours: DS.attr('number'),
  reservations: DS.hasMany('reservation'),
  memberships: DS.hasMany('membership'),

  amountOfGroupMembers: computed(function() {
    return 10;
  })
});
