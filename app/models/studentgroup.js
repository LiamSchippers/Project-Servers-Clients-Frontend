import DS from 'ember-data';

export default DS.Model.extend({
  groupName: DS.attr('string'),
  hours: DS.attr('number'),
  maxHours: DS.attr('number'),
  groupMembers: DS.attr()
});
