import DS from 'ember-data';
import {computed} from '@ember/object';


export default DS.Model.extend({
  groupID: DS.attr('number'),
  groupName: DS.attr('string'),
  hours: DS.attr('number'),
  maxHours: DS.attr('number'),
  groupMembers: DS.attr(),

  amountOfGroupMembers: computed(function() {
    return 10;
  })
});
