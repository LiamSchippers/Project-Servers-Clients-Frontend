import DS from 'ember-data';

export default DS.Model.extend({
  groupName: DS.attr('string'),
  ects: DS.attr('number'),
  groupMembers: DS.attr()
});
