import DS from 'ember-data';

export default DS.Model.extend({
  groupID: DS.attr('number'),
  groupName: DS.attr('string'),
  hours: DS.attr('number'),
  studentgroup: DS.hasMany('membership')
});
